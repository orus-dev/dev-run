"use client";

import { Search, Grid, List } from "lucide-react";
import { useState } from "react";

import ProblemCard from "@/components/app/ProblemCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Problems = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = ["All", "Arrays", "Trees", "Graphs", "DP", "Strings"];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Problems</h1>
          <p className="text-muted-foreground">
            Choose your battleground. Each run brings you closer to your PB.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search problems..." className="pl-9" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <Badge
                key={cat}
                variant={i === 0 ? "default" : "secondary"}
                className="cursor-pointer"
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2">
            {difficulties.map((diff, i) => (
              <Button
                key={diff}
                variant={i === 0 ? "outline" : "ghost"}
                size="sm"
              >
                {diff}
              </Button>
            ))}
          </div>

          {/* View Toggle */}
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(v) => v && setViewMode(v as "grid" | "list")}
          >
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Problem Grid */}
        <div
          className={`grid gap-4 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {problems.map((problem, i) => (
            <ProblemCard key={problem.name} {...problem} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Problems;

/* ---------------- data ---------------- */

const problems = [
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
