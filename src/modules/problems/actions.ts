"use server";

import * as Core from "./core";
import { Problem } from "./types";

export async function getProblems(): Promise<Problem[]> {
  return [
    {
      name: "Two Sum Dash",
      difficulty: "easy" as const,
      tags: ["arrays", "hash-map"],
      bestTime: "0:42",
      attempts: 12453,
    },
    {
      name: "Binary Sprint",
      difficulty: "easy" as const,
      tags: ["binary-search"],
      bestTime: "0:38",
      attempts: 8921,
    },
    {
      name: "Linked List Rush",
      difficulty: "medium" as const,
      tags: ["linked-list", "pointers"],
      bestTime: "1:24",
      attempts: 6234,
    },
    {
      name: "Tree Traverse Blitz",
      difficulty: "medium" as const,
      tags: ["trees", "recursion"],
      bestTime: "2:01",
      attempts: 5102,
    },
    {
      name: "DP Gauntlet",
      difficulty: "hard" as const,
      tags: ["dynamic-programming"],
      bestTime: "4:32",
      attempts: 2341,
    },
    {
      name: "Graph Navigator",
      difficulty: "hard" as const,
      tags: ["graphs", "bfs", "dfs"],
      bestTime: "3:45",
      attempts: 3456,
    },
    {
      name: "String Scramble",
      difficulty: "easy" as const,
      tags: ["strings", "manipulation"],
      bestTime: "0:55",
      attempts: 9876,
    },
    {
      name: "Stack Overflow",
      difficulty: "medium" as const,
      tags: ["stacks", "queues"],
      bestTime: "1:42",
      attempts: 4567,
    },
    {
      name: "Heap Hero",
      difficulty: "hard" as const,
      tags: ["heaps", "priority-queue"],
      bestTime: "3:21",
      attempts: 1890,
    },
    {
      name: "Sliding Window Slam",
      difficulty: "medium" as const,
      tags: ["sliding-window", "arrays"],
      bestTime: "1:56",
      attempts: 5678,
    },
    {
      name: "Trie Triumph",
      difficulty: "hard" as const,
      tags: ["trie", "strings"],
      bestTime: "4:12",
      attempts: 1234,
    },
    {
      name: "Backtrack Blaster",
      difficulty: "hard" as const,
      tags: ["backtracking", "recursion"],
      bestTime: "5:01",
      attempts: 987,
    },
  ];
}
