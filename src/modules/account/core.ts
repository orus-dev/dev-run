"use server";

import { SupabaseClient, User } from "@supabase/supabase-js";
import "server-only";
import { UserProfile } from "../user/types";

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
      username: user.user_metadata.login || null,
      full_name: user.user_metadata.name || null,
      avatar_url: user.user_metadata.avatar_url || null,
    })
    .select()
    .single();

  if (insertError) throw insertError;

  return newProfile;
}

export async function getSession(
  supabase: SupabaseClient,
): Promise<[User, UserProfile]> {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    throw new Error("No authenticated user found");
  }

  const user = session.user;

  const profile = await getProfile(supabase, user);

  return [user, profile];
}
