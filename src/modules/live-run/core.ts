"use server";

import "server-only";
import { LiveRun, LiveRunMove } from "./types";
import { SupabaseClient } from "@supabase/supabase-js";
import { redis } from "@/lib/redis";
import { randomInt } from "crypto";

/** -------------------- Live Runs in Redis -------------------- */

/**
 * Add a live run to Redis
 */
export async function addLiveRun(run: LiveRun) {
  const exists = await redis.exists(`liveRun:${run.id}`);
  if (exists) throw new Error("Duplicate run");

  await redis.set(`liveRun:${run.id}`, JSON.stringify(run));
}

/**
 * Get a live run from Redis
 */
export async function getLiveRun(id: string): Promise<LiveRun | null> {
  const data = await redis.get(`liveRun:${id}`);
  if (!data) return null;
  return JSON.parse(data) as LiveRun;
}

/**
 * Get all live runs
 */
export async function getLiveRuns(): Promise<LiveRun[]> {
  const keys = await redis.keys("liveRun:*");
  if (keys.length === 0) return [];
  const runs = await redis.mget(...keys);
  return runs.filter(Boolean).map((r) => JSON.parse(r!) as LiveRun);
}

/**
 * Remove a live run from Redis
 */
export async function removeLiveRun(id: string) {
  await redis.del(`liveRun:${id}`, `liveRunMoves:${id}`);
}

/** -------------------- Live Run Moves -------------------- */

/**
 * Add moves to a live run (ephemeral)
 */
export async function addLiveRunMoves(id: string, moves: LiveRunMove[]) {
  const runExists = await redis.exists(`liveRun:${id}`);
  if (!runExists) throw new Error("Invalid run");

  const pipeline = redis.pipeline();
  moves.forEach((move) => {
    pipeline.rpush(`liveRunMoves:${id}`, JSON.stringify(move));
  });

  setTimeout(() => {
    redis.del(`liveRunMoves:${id}`);
  }, 3000);

  await pipeline.exec();
}

/**
 * Get live moves for a run
 */
export async function getLiveRunMoves(id: string): Promise<LiveRunMove[]> {
  const moves = await redis.lrange(`liveRunMoves:${id}`, 0, -1);
  return moves.map((m) => JSON.parse(m)) as LiveRunMove[];
}

/** -------------------- Submit Run -------------------- */

/**
 * Submit a run to Supabase (persistent storage)
 * and remove it from Redis
 */
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

  await removeLiveRun(run.id);

  return data;
}
