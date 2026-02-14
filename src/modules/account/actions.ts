"use server";

import { getOrigin } from "@/lib/origin/server";
import * as Core from "./core";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithGitHub() {
  const supabase = await createClient();

  const { host, protocol } = await getOrigin();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${protocol}://${host}/api/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    return redirect("/login?msg=Trouble");
  }

  return redirect(data.url);
}

export async function getSession() {
  const supabase = await createClient();

  return await Core.getSession(supabase);
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
}
