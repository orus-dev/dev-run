"use server";

import * as Core from "./core";
import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function signInWithGitHub() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    console.error(error);
    return redirect("/login?msg=Trouble");
  }

  return redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
}
