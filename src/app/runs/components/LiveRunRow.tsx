"use client";

import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { LiveRun } from "@/modules/live-run/types";
import formatTime from "@/lib/time-format";
import useAction from "@/hook/use-action";
import { getProblem } from "@/modules/problems/actions";
import Link from "next/link";
import { Eye, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LiveRunRow({
  index,
  run,
}: {
  index: number;
  run: LiveRun;
}) {
  const [problem] = useAction(() => getProblem(run.problem));

  const now = new Date().getTime() + 1000;
  const isTop = run.views >= 5;

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
      <TableCell>
        <Link
          href={`problems/${run.problem}`}
          className="hover:text-primary flex items-center gap-1"
        >
          <LinkIcon className="w-3 h-3" />
          {problem?.title || run.problem}
        </Link>
      </TableCell>

      {/* Runtime */}
      <TableCell
        className={`font-mono ${isTop ? "text-primary font-bold" : ""}`}
      >
        {formatTime(now - run.start, false)}
      </TableCell>

      {/* Views */}
      <TableCell className="text-center">
        {isTop ? <Badge>{run.views}</Badge> : run.views}
      </TableCell>

      {/* Category */}
      <TableCell className="text-center">{run.category}</TableCell>

      {/* Actions */}
      <TableCell className="pr-5 text-end">
        <Link href={`/runs/${run.id}`}>
          <Button size="sm" variant={isTop ? "default" : "ghost"}>
            <Eye className="h-4 w-4 mr-1" />
            Watch
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}
