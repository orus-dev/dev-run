"use client";

import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { LiveRun } from "@/modules/live-run/types";
import formatTime from "@/lib/time-format";

export default function LiveRunRow({
  index,
  run,
}: {
  index: number;
  run: LiveRun;
}) {
  const now = new Date().getTime() + 1000;
  const isTop = run.views > 5;

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
      {/* Runner */}
      <TableCell className="font-medium pl-5 py-5">
        {isTop ? `🔥 ${run.username}` : run.username}
      </TableCell>

      {/* Problem + Category */}
      <TableCell>{run.problem}</TableCell>

      {/* Runtime */}
      <TableCell
        className={`font-mono ${isTop ? "text-primary font-bold" : ""}`}
      >
        {formatTime(now - run.start, false)}
      </TableCell>

      {/* Views */}
      <TableCell>{isTop ? <Badge>{run.views}</Badge> : run.views}</TableCell>

      {/* Live status with category color */}
      <TableCell>{run.category}</TableCell>
    </TableRow>
  );
}
