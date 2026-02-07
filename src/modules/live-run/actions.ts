"use server";

import * as Core from "./core";
import { LiveRun } from "./types";

export async function getLiveRuns(): Promise<LiveRun[]> {
  return Core.getLiveRuns();
}

export async function getLiveRun(id: string): Promise<LiveRun | undefined> {
  return Core.getLiveRun(id);
}

export async function getLiveRunMoves(id: string) {
  return Core.getLiveRunMoves(id);
}
