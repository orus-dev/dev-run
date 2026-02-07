"use server";

import "server-only";
import { LiveRun, LiveRunMove } from "./types";

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
  if (!liveRuns.find((r) => r.id === run.id || r.username === run.username))
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
