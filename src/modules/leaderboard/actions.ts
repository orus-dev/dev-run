"use server";

import * as Core from "./core";
import { Leaderboard } from "./types";

export async function getGlobalLeaderboard(): Promise<Leaderboard> {
  return [
    {
      rank: 1,
      username: "speedmaster_x",
      pb: "2:34.21",
      runsCount: 2341,
      category: "Any%",
    },
    {
      rank: 2,
      username: "algo_ninja",
      pb: "2:38.54",
      runsCount: 1876,
      category: "Any%",
    },
    {
      rank: 3,
      username: "clockwork",
      pb: "2:41.02",
      runsCount: 3102,
      category: "Any%",
    },
    {
      rank: 4,
      username: "fastfingers99",
      pb: "2:45.33",
      runsCount: 987,
      category: "Any%",
    },
    {
      rank: 5,
      username: "recursion_queen",
      pb: "2:47.89",
      runsCount: 1543,
      category: "Any%",
    },
    {
      rank: 6,
      username: "bitshifter",
      pb: "2:52.11",
      runsCount: 2109,
      category: "Any%",
    },
    {
      rank: 7,
      username: "nullpointer",
      pb: "2:54.67",
      runsCount: 876,
      category: "Any%",
    },
    {
      rank: 8,
      username: "stackattack",
      pb: "2:58.23",
      runsCount: 1234,
      category: "Any%",
    },
    {
      rank: 9,
      username: "looplegend",
      pb: "3:01.45",
      runsCount: 654,
      category: "Any%",
    },
    {
      rank: 10,
      username: "coderunner",
      pb: "3:05.78",
      runsCount: 1098,
      category: "Any%",
    },
  ];
}

export async function getWeeklyLeaderboard(): Promise<Leaderboard> {
  return [
    {
      rank: 1,
      username: "weekly_warrior",
      pb: "2:51.33",
      runsCount: 156,
      category: "Any%",
    },
    {
      rank: 2,
      username: "speedmaster_x",
      pb: "2:53.12",
      runsCount: 89,
      category: "Any%",
    },
    {
      rank: 3,
      username: "newbie_grinder",
      pb: "2:58.67",
      runsCount: 234,
      category: "Any%",
    },
    {
      rank: 4,
      username: "algo_ninja",
      pb: "3:02.45",
      runsCount: 67,
      category: "Any%",
    },
    {
      rank: 5,
      username: "fresh_runner",
      pb: "3:05.89",
      runsCount: 45,
      category: "Any%",
    },
    {
      rank: 6,
      username: "practice_makes",
      pb: "3:08.12",
      runsCount: 112,
      category: "Any%",
    },
    {
      rank: 7,
      username: "splitmaster",
      pb: "3:12.34",
      runsCount: 78,
      category: "Any%",
    },
    {
      rank: 8,
      username: "grindtime",
      pb: "3:15.56",
      runsCount: 92,
      category: "Any%",
    },
    {
      rank: 9,
      username: "pb_hunter",
      pb: "3:18.90",
      runsCount: 56,
      category: "Any%",
    },
    {
      rank: 10,
      username: "reset_king",
      pb: "3:22.11",
      runsCount: 187,
      category: "Any%",
    },
  ];
}
