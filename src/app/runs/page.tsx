"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LiveRunRow from "./components/LiveRunRow";
import { useActionInterval } from "@/hook/use-action";
import { getLiveRuns } from "@/modules/live-run/actions";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function LiveRuns() {
  const [liveRuns] = useActionInterval(getLiveRuns, 1500);

  const sortedRuns = (liveRuns || []).sort((a, b) => {
    const aTrending = a.views >= 5;
    const bTrending = b.views >= 5;

    if (aTrending && bTrending) {
      // Both trending → sort by views descending, then timestamp descending
      if (b.views !== a.views) return b.views - a.views;
      return b.start - a.start;
    } else if (aTrending) {
      return -1; // a goes first
    } else if (bTrending) {
      return 1; // b goes first
    } else {
      // Neither trending → sort by timestamp descending
      return b.start - a.start;
    }
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Live Runs</h1>
          <p className="text-muted-foreground">
            {liveRuns?.length} live runs · Streaming in real time
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <ToggleGroup variant="outline" type="single">
            <ToggleGroupItem value="any%" aria-label="any%">
              any%
            </ToggleGroupItem>
            <ToggleGroupItem value="100%" aria-label="100%">
              100%
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Runner</TableHead>
                <TableHead>Problem</TableHead>
                <TableHead className="w-20 text-center">Time</TableHead>
                <TableHead className="w-20 text-center">Views</TableHead>
                <TableHead className="w-20 text-center">Category</TableHead>
                <TableHead className="pr-5 w-24" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedRuns.map((run, index) => (
                <LiveRunRow key={run.id} index={index} run={run} />
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
