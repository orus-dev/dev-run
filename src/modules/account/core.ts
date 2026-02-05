"use server";

import { SupabaseClient, User } from "@supabase/supabase-js";
import "server-only";
import { UserProfile } from "../user/types";

export async function signInWithGitHub(supabase: SupabaseClient) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return data.url;
}

export async function getProfile(
  supabase: SupabaseClient,
  user: User,
): Promise<UserProfile> {
  // Try to fetch existing profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = "No rows found" is fine
    throw error;
  }

  // If no profile, create one
  if (!profile) {
    return getGithubProfile(supabase, user);
  }

  return profile;
}

export async function getGithubProfile(
  supabase: SupabaseClient,
  user: User,
): Promise<UserProfile> {
  const { data: newProfile, error: insertError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      username: user.user_metadata.user_name || `user_${user.id.slice(0, 6)}`,
      avatar_url: user.user_metadata.avatar_url || null,
      bio: "",
      created_at: new Date(),
    } satisfies UserProfile)
    .select()
    .single();

  if (insertError) throw insertError;

  return newProfile;
}

export async function getSession(
  supabase: SupabaseClient,
): Promise<[User, UserProfile]> {
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    throw new Error("No authenticated user found");
  }

  const profile = await getProfile(supabase, user);

  return [user, profile];
}

export async function getSessionRedirect(
  supabase: SupabaseClient,
  redirect: (s: string) => void,
): Promise<[User, UserProfile] | undefined> {
  try {
    return await getSession(supabase);
  } catch {
    redirect("/login");
  }
}
