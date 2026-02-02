"use client";

import { Search, Grid, List } from "lucide-react";
import ProblemCard from "@/components/app/ProblemCard";
import { useState } from "react";

const Problems = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  const categories = ["All", "Arrays", "Trees", "Graphs", "DP", "Strings"];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-2">Problems</h1>
          <p className="text-muted-foreground">
            Choose your battleground. Each run brings you closer to your PB.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  cat === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2">
            {difficulties.map((diff) => (
              <button
                key={diff}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  diff === "All"
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border hover:border-primary/30"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
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
