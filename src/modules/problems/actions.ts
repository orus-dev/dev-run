"use server";

import * as Core from "./core";
import { Problem } from "./types";

export async function getProblems(): Promise<Problem[]> {
  return await Core.getProblems();
}

export async function getProblem(id: string): Promise<Problem | undefined> {
  return await Core.getProblem(id);
}
