"use server";

import { createClient } from "@/lib/supabase/server";
import * as Core from "./core";
import { LeaderboardUser } from "./types"; // updated interface

export async function getGlobalLeaderboard(): Promise<LeaderboardUser[]> {
  const supabase = await createClient();

  return await Core.getGlobalLeaderboard(supabase);
}

export async function getWeeklyLeaderboard(): Promise<LeaderboardUser[]> {
  const supabase = await createClient();

  return await Core.getWeeklyLeaderboard(supabase);
}
