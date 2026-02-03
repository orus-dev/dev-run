"use client";

import { Zap, Users, Timer, TrendingUp, Eye } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/* ---------------- mock data ---------------- */

const liveRuns = [
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

/* ---------------- page ---------------- */

export default function LiveRuns() {
  // Sort top runners (status === 'pb') to the top
  const sortedRuns = [...liveRuns].sort((a, b) => {
    if (a.status === "pb" && b.status !== "pb") return -1;
    if (a.status !== "pb" && b.status === "pb") return 1;
    return 0;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Live Runs</h1>
          <p className="text-muted-foreground">
            Watch runners compete in real time. Every second counts.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Zap} label="Live Runs" value="42" />
          <StatCard icon={Users} label="Active Runners" value="39" />
          <StatCard icon={Timer} label="Avg Runtime" value="1:47" />
          <StatCard icon={TrendingUp} label="PB Pace Runs" value="7" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {["Any%", "100%", "Easy", "Hard"].map((cat) => (
            <Badge key={cat} variant="outline" className="cursor-pointer">
              {cat}
            </Badge>
          ))}

          <Badge className="bg-primary/10 text-primary">🔥 PB Pace</Badge>
        </div>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Runner</TableHead>
                <TableHead>Problem</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Pace</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-5" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedRuns.map((run, index) => (
                <LiveRunRow key={run.id} {...run} index={index} />
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

function LiveRunRow({
  index,
  username,
  problem,
  category,
  time,
  pace,
  status,
}: any) {
  const pacePositive = pace.startsWith("+");
  const isTop = status === "pb";

  return (
    <TableRow
      className={cn(
        "opacity-0 animate-fade-in",
        isTop ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-secondary/50",
      )}
      style={{
        animationDelay: `${index * 0.05}s`,
        animationFillMode: "forwards",
      }}
    >
      <TableCell className="font-medium pl-5">
        {isTop ? `🔥 ${username}` : username}
      </TableCell>

      <TableCell>
        <div className="flex flex-col gap-1">
          <span>{problem}</span>
          <Badge variant="outline" className="w-fit text-xs">
            {category}
          </Badge>
        </div>
      </TableCell>

      <TableCell
        className={`font-mono ${isTop ? "text-primary font-bold" : ""}`}
      >
        {time}
      </TableCell>

      <TableCell>
        <Badge
          className={
            pacePositive
              ? "bg-red-500/10 text-red-400"
              : "bg-green-500/10 text-green-400"
          }
        >
          {pace}
        </Badge>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2 text-sm">
          <span
            className={`h-2 w-2 rounded-full ${
              status === "pb"
                ? "bg-green-500"
                : status === "danger"
                  ? "bg-red-500"
                  : "bg-emerald-400"
            }`}
          />
          Live
        </div>
      </TableCell>

      <TableCell className="text-right pr-5">
        <Button size="sm" variant={isTop ? "default" : "ghost"}>
          <Eye className="h-4 w-4 mr-1" />
          Watch
        </Button>
      </TableCell>
    </TableRow>
  );
}

/* ---------------- helpers ---------------- */

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2 text-center">
        <Icon className="mx-auto h-5 w-5 text-primary" />
        <CardTitle className="font-mono text-2xl">{value}</CardTitle>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardHeader>
    </Card>
  );
}
