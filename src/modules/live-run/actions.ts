"use server";

import { createClient } from "@/lib/supabase/server";
import { getSession, getSessionRedirect } from "../account/core";
import * as Core from "./core";
import { Run } from "./types";
import { redirect } from "next/navigation";

export async function getLiveRuns(): Promise<Run[]> {
  const supabase = await createClient();

  const _ = await getSession(supabase);

  return [
    {
      id: 1,
      username: "speedmaster_x",
      problem: "Two Sum Dash",
      category: "Any%",
      time: "1:52.34",
      pace: "-0:03",
      status: "pb",
    },
    {
      id: 2,
      username: "algo_ninja",
      problem: "Binary Sprint",
      category: "Any%",
      time: "2:04.11",
      pace: "+0:05",
      status: "normal",
    },
    {
      id: 3,
      username: "stackattack",
      problem: "String Scramble",
      category: "Easy",
      time: "0:48.92",
      pace: "-0:01",
      status: "pb",
    },
    {
      id: 4,
      username: "reset_king",
      problem: "Linked List Rush",
      category: "Any%",
      time: "1:31.77",
      pace: "+0:12",
      status: "danger",
    },
  ];
}
