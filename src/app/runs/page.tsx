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
import useAction from "@/hook/use-action";
import { getLiveRuns } from "@/modules/live-run/actions";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function LiveRuns() {
  const [liveRuns] = useAction(getLiveRuns);

  // Sort top runners (status === 'pb') to the top
  const sortedRuns = [...(liveRuns || [])];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Live Runs</h1>
          <p className="text-muted-foreground">
            42 live runs · Streaming in real time
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <ToggleGroup variant="outline" type="single" defaultValue="any">
            <ToggleGroupItem value="any" aria-label="any%">
              any%
            </ToggleGroupItem>
            <ToggleGroupItem value="100" aria-label="100%">
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
                <TableHead className="w-20">Time</TableHead>
                <TableHead className="w-20">Views</TableHead>
                <TableHead className="pr-5">Category</TableHead>
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
