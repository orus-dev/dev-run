import { LeaderboardRank } from "@/modules/leaderboard/types";
import { LinkIcon, Trophy } from "lucide-react";
import Link from "next/link";

const LeaderboardRow = ({
  index = 0,
  run,
}: {
  index?: number;
  run: LeaderboardRank;
}) => {
  const getRankStyle = (rank: number) => {
    if (run.rank === 1) return "rank-gold";
    if (run.rank === 2) return "rank-silver";
    if (run.rank === 3) return "rank-bronze";
    return "bg-secondary text-muted-foreground";
  };

  const getRankGlow = (rank: number) => {
    if (run.rank === 1) return "glow-gold";
    if (run.rank === 2) return "glow-silver";
    if (run.rank === 3) return "glow-bronze";
    return "";
  };

  const isTopThree = run.rank <= 3;

  return (
    <tr
      className={`group border-b border-border hover:bg-secondary/50 transition-colors animate-fade-in opacity-0 ${isTopThree ? "bg-secondary/30" : ""}`}
      style={{
        animationDelay: `${index * 0.05}s`,
        animationFillMode: "forwards",
      }}
    >
      {/* Rank */}
      <td className="py-4 px-5 w-16">
        <div
          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${getRankStyle(run.rank)} ${getRankGlow(run.rank)}`}
        >
          {isTopThree ? <Trophy className="h-4 w-4" /> : run.rank}
        </div>
      </td>

      {/* Username */}
      <td>
        <div className="flex items-center gap-3">
          <span
            className={`font-medium ${isTopThree ? "text-foreground" : "text-secondary-foreground"} group-hover:text-primary transition-colors`}
          >
            {run.username}
          </span>
        </div>
      </td>

      {/* Time */}
      <td>
        <span className="font-mono text-primary font-semibold flex justify-center">
          {run.pb}
        </span>
      </td>

      {/* Category */}
      <td className="py-4 px-4">
        <span className="px-2 py-1 rounded-md bg-secondary text-muted-foreground text-xs">
          {run.category}
        </span>
      </td>

      {/* Assisted */}
      <td className="py-4 px-4">
        <span className="px-2 py-1 rounded-md bg-secondary text-muted-foreground text-xs">
          {run.assisted ? "Assisted" : "Unassisted"}
        </span>
      </td>

      {/* Runs */}
      <td className="py-4 px-4 w-16 text-muted-foreground">{run.runsCount}</td>

      {/* Problem */}
      <td className="py-4 px-4">
        <Link href="/" className="hover:text-primary flex items-center gap-1">
          <LinkIcon className="w-3 h-3" /> {run.problem}
        </Link>
      </td>
    </tr>
  );
};

export default LeaderboardRow;
