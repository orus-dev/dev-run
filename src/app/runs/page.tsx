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
import LiveRunRow from "./components/LiveRunNow";
import StatCard from "@/components/app/StatCard";
import useAction from "@/hook/use-action";
import { getLiveRuns } from "@/modules/live-run/actions";

export default function LiveRuns() {
  const [liveRuns, liveRunsLoaded, liveRunsError] = useAction(getLiveRuns);

  // Sort top runners (status === 'pb') to the top
  const sortedRuns = [...(liveRuns || [])].sort((a, b) => {
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
          <StatCard icon={Zap} label="Live Runs" value="42" index={0} />
          <StatCard icon={Users} label="Active Runners" value="39" index={1} />
          <StatCard icon={Timer} label="Avg Runtime" value="1:47" index={2} />
          <StatCard
            icon={TrendingUp}
            label="PB Pace Runs"
            value="7"
            index={3}
          />
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
