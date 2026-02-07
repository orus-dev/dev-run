"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import "server-only";
import { LeaderboardUser } from "./types";

export async function getGlobalLeaderboard(
  supabase: SupabaseClient,
): Promise<LeaderboardUser[]> {
  const { data, error } = await supabase.rpc("get_global_leaderboard");
  if (error) throw error;
  return data;
}

export async function getWeeklyLeaderboard(
  supabase: SupabaseClient,
): Promise<LeaderboardUser[]> {
  const { data, error } = await supabase.rpc("get_weekly_leaderboard");
  if (error) throw error;
  return data;
}
