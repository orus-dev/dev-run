"use server";

import "server-only";
import { LiveRun, LiveRunMove } from "./types";
import { SupabaseClient } from "@supabase/supabase-js";

const liveRuns: LiveRun[] = [];
const liveRunMoves: Record<string, LiveRunMove[]> = {};

export async function getLiveRuns(): Promise<LiveRun[]> {
  return liveRuns;
}

export async function getLiveRun(id: string): Promise<LiveRun | undefined> {
  return liveRuns.find((r) => r.id === id);
}

export async function getLiveRunMoves(
  id: string,
): Promise<LiveRunMove[] | undefined> {
  return liveRunMoves[id];
}

export async function addRun(run: LiveRun) {
  if (liveRuns.find((r) => r.id === run.id || r.username === run.username))
    throw "Duplicate run";

  liveRuns.push(run);
}

export async function addLiveRunMoves(id: string, moves: LiveRunMove[]) {
  if (!liveRunMoves[id]) throw "Invalid run";

  // Add the moves immediately
  liveRunMoves[id] = [...liveRunMoves[id], ...moves];

  // After 3 seconds, remove only the moves we just added
  setTimeout(() => {
    liveRunMoves[id] = liveRunMoves[id].filter((move) => !moves.includes(move));
  }, 3000);
}

export async function removeLiveRun(runId: string) {
  delete liveRunMoves[runId];

  const index = liveRuns.findIndex((run) => run.id === runId);

  if (index !== -1) {
    liveRuns.splice(index, 1);
  }
}

export async function submitRun(
  supabase: SupabaseClient,
  run: LiveRun,
  user_id: string,
) {
  const now = new Date();
  const durationMs = now.getTime() - run.start;

  const { data, error } = await supabase
    .from("runs")
    .insert([
      {
        id: run.id,
        user_id,
        problem_id: run.problem,
        category: run.category,
        assisted: false,
        duration_ms: durationMs,
        started_at: new Date(run.start),
        finished_at: now,
        valid: false,
        invalid_reason: null,
      },
    ])
    .select();

  if (error) {
    console.error("Error inserting run:", error);
    throw error;
  }

  return data;
}
