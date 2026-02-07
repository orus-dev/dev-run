import { Trophy } from "lucide-react";

export default function Rank({ rank }: { rank: number }) {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return "rank-gold";
    if (rank === 2) return "rank-silver";
    if (rank === 3) return "rank-bronze";
    return "bg-secondary text-muted-foreground";
  };

  const getRankGlow = (rank: number) => {
    if (rank === 1) return "glow-gold";
    if (rank === 2) return "glow-silver";
    if (rank === 3) return "glow-bronze";
    return "";
  };

  const isTopThree = rank <= 3;

  return (
    <div
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${getRankStyle(
        rank,
      )} ${getRankGlow(rank)}`}
    >
      {isTopThree ? <Trophy className="h-4 w-4" /> : rank}
    </div>
  );
}
