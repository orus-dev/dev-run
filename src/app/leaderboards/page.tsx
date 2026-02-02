"use client";

import { Trophy, Calendar, Globe, TrendingUp } from "lucide-react";
import LeaderboardRow from "@/components/app/LeaderboardRow";
import { useState } from "react";

const Leaderboards = () => {
  const [activeTab, setActiveTab] = useState<"global" | "weekly">("global");

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

  const categories = ["Any%", "100%", "Easy Only", "No DP", "Blind"];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Leaderboards
          </h1>
          <p className="text-muted-foreground">
            The fastest runners in the game. Will you claim a spot?
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <Globe className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold font-mono text-foreground">
              12,453
            </p>
            <p className="text-xs text-muted-foreground">Total Runners</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <Trophy className="h-5 w-5 text-gold mx-auto mb-2" />
            <p className="text-2xl font-bold font-mono text-foreground">
              2:34.21
            </p>
            <p className="text-xs text-muted-foreground">World Record</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <TrendingUp className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
            <p className="text-2xl font-bold font-mono text-foreground">847K</p>
            <p className="text-xs text-muted-foreground">Runs This Week</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <Calendar className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold font-mono text-foreground">
              5d 12h
            </p>
            <p className="text-xs text-muted-foreground">Until Reset</p>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          {/* Global/Weekly Toggle */}
          <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
            <button
              onClick={() => setActiveTab("global")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "global"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe className="h-4 w-4" />
              Global
            </button>
            <button
              onClick={() => setActiveTab("weekly")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "weekly"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Calendar className="h-4 w-4" />
              Weekly
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  i === 0
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Rank
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Runner
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  PB
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Runs
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "global"
                ? globalLeaderboard
                : weeklyLeaderboard
              ).map((entry, i) => (
                <LeaderboardRow key={entry.username} {...entry} index={i} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button className="px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-all">
            Previous
          </button>
          {[1, 2, 3, 50].map((page, i) => (
            <button
              key={i}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                page === 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-all">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;
