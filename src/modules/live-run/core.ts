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

export async function addLiveRunMove(id: string) {
  if (!liveRuns.find((r) => r.id === id)) throw "Invalid run";
}
