import { Trophy } from "lucide-react";

export default function Rank({ rank }: { rank: number }) {
  const getRankStyle = (rank: number) => {
    if (rank === 1)
      return "bg-linear-to-r from-yellow-500 to-amber-400 text-black";
    if (rank === 2)
      return "bg-linear-to-r from-gray-300 to-gray-400 text-black";
    if (rank === 3)
      return "bg-linear-to-r from-orange-600 to-amber-700 text-white";
    return "bg-secondary text-muted-foreground";
  };

  const getRankGlow = (rank: number) => {
    if (rank === 1)
      return "shadow-[0_0_20px_color-mix(in_oklch,oklch(82.8%_0.189_84.429)_70%,transparent)]";
    if (rank === 2)
      return "shadow-[0_0_20px_color-mix(in_oklch,var(--foreground)_60%,transparent)]";
    if (rank === 3)
      return "shadow-[0_0_20px_color-mix(in_oklch,oklch(55.5%_0.163_48.998)_60%,transparent)]";
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
