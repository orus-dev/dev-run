"use client";

import { Trophy, Calendar, Globe, TrendingUp } from "lucide-react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import LeaderboardRow from "@/app/leaderboards/components/LeaderboardRow";
import StatCard from "@/components/app/StatCard";

const globalLeaderboard = [
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
const weeklyLeaderboard = [
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

export default function Leaderboards() {
  const [activeTab, setActiveTab] = useState<"global" | "weekly">("global");

  const categories = ["Any%", "100%", "Easy Only", "No DP", "Blind"];

  const data = activeTab === "global" ? globalLeaderboard : weeklyLeaderboard;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Leaderboards</h1>
          <p className="text-muted-foreground">
            The fastest runners in the game. Will you claim a spot?
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={Globe}
            label="Total Runners"
            value="12,453"
            index={0}
          />
          <StatCard
            icon={Trophy}
            label="World Record"
            value="2:34.21"
            index={1}
          />
          <StatCard
            icon={TrendingUp}
            label="Runs This Week"
            value="847K"
            index={2}
          />
          <StatCard
            icon={Calendar}
            label="Until Reset"
            value="5d 12h"
            index={3}
          />
        </div>

        {/* Tabs + Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "global" | "weekly")}
          >
            <TabsList>
              <TabsTrigger value="global">
                <Globe className="mr-2 h-4 w-4" />
                Global
              </TabsTrigger>
              <TabsTrigger value="weekly">
                <Calendar className="mr-2 h-4 w-4" />
                Weekly
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <Badge
                key={cat}
                variant={i === 0 ? "default" : "outline"}
                className="cursor-pointer"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Runner</TableHead>
                <TableHead>PB</TableHead>
                <TableHead>Runs</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry, i) => (
                <LeaderboardRow key={entry.username} {...entry} index={i} />
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>

            {[1, 2, 3, 50].map((p) => (
              <PaginationItem key={p}>
                <PaginationLink isActive={p === 1}>{p}</PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
