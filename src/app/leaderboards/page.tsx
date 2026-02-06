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
import useAction from "@/hook/use-action";
import {
  getGlobalLeaderboard,
  getWeeklyLeaderboard,
} from "@/modules/leaderboard/actions";

export default function Leaderboards() {
  const [global, globalLoaded, globalError] = useAction(getGlobalLeaderboard);
  const [weekly, weeklyLoaded, weeklyError] = useAction(getWeeklyLeaderboard);

  const [activeTab, setActiveTab] = useState<"global" | "weekly">("global");
  const categories = ["Any%", "100%", "Easy Only", "No DP", "Blind"];
  const data = (activeTab === "global" ? global : weekly) || [];

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
                <Globe className="h-4 w-4" />
                Global
              </TabsTrigger>
              <TabsTrigger value="weekly">
                <Calendar className="h-4 w-4" />
                This week
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
                <TableHead className="pl-5">Rank</TableHead>
                <TableHead>Runner</TableHead>
                <TableHead>PB</TableHead>
                <TableHead>Runs</TableHead>
                <TableHead className="pr-5">Category</TableHead>
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
