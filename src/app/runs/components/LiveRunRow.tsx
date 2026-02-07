"use client";

import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      <TableCell className="font-medium pl-5">
        {isTop ? `🔥 ${run.username}` : run.username}
      </TableCell>

      <TableCell>
        <div className="flex flex-col gap-1">
          <span>{run.problem}</span>
          <Badge variant="outline" className="w-fit text-xs">
            {run.category}
          </Badge>
        </div>
      </TableCell>

      <TableCell
        className={`font-mono ${isTop ? "text-primary font-bold" : ""}`}
      >
        {formatTime(now - run.start, false)}
      </TableCell>

      <TableCell>{isTop ? <Badge>{run.views}</Badge> : run.views}</TableCell>

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
