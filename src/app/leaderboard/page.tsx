"use client";

import { Calendar, Globe } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import LeaderboardRow from "@/app/leaderboard/components/LeaderboardRow";
import useAction from "@/hook/use-action";
import {
  getGlobalLeaderboard,
  getWeeklyLeaderboard,
} from "@/modules/leaderboard/actions";

export default function Leaderboard() {
  const [global] = useAction(getGlobalLeaderboard);
  const [weekly] = useAction(getWeeklyLeaderboard);

  const [activeTab, setActiveTab] = useState<"global" | "weekly">("global");
  const data = (activeTab === "global" ? global : weekly) || [];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Leaderboard</h1>
          <p className="text-sm text-muted-foreground mb-4">
            1,284 runners · Ranked by performance
          </p>
        </div>

        {/* Filters */}
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
        </div>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                {/* Rank */}
                <TableHead className="py-4 px-5 w-16 text-center">
                  Rank
                </TableHead>

                {/* Runner / Username */}
                <TableHead className="py-4 px-4 text-left">Runner</TableHead>

                {/* World Records */}
                <TableHead className="py-4 px-4 w-24 text-center">
                  World Records
                </TableHead>

                {/* Podiums */}
                <TableHead className="py-4 px-4 w-24 text-center">
                  Podiums
                </TableHead>

                {/* Problems Completed */}
                <TableHead className="py-4 px-4 text-center">
                  Problems Completed
                </TableHead>

                {/* User ID (optional) */}
                <TableHead className="py-4 px-4 hidden md:table-cell text-left text-xs text-muted-foreground">
                  User ID
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry, i) => (
                <LeaderboardRow key={entry.rank} index={i} run={entry} />
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
