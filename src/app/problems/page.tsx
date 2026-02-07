"use client";

import { Search, Grid, List } from "lucide-react";
import { useState } from "react";

import ProblemCard from "@/app/problems/components/ProblemCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useAction from "@/hook/use-action";
import { getProblems } from "@/modules/problems/actions";

export default function Problems() {
  const [problems, problemsLoaded, problemsError] = useAction(getProblems);

  console.log(problems);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
            <ToggleGroup variant="outline" type="multiple">
              {["Arrays", "Trees", "Graphs", "DP", "Strings"].map((f) => (
                <ToggleGroupItem value={f.toLowerCase()} aria-label={f} key={f}>
                  {f}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap gap-2">
            <ToggleGroup variant="outline" type="multiple">
              {["Easy", "Medium", "Hard"].map((f) => (
                <ToggleGroupItem value={f.toLowerCase()} aria-label={f} key={f}>
                  {f}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
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
          {problems &&
            problems.map((problem, i) => (
              <ProblemCard key={problem.title} index={i} problem={problem} />
            ))}
        </div>
      </div>
    </div>
  );
}
