"use client";

import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function LiveRunRow({
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
