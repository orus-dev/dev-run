import { Trophy } from "lucide-react";

interface LeaderboardRowProps {
  rank: number;
  username: string;
  pb: string;
  runsCount: number;
  category: string;
  index?: number;
}

const LeaderboardRow = ({ rank, username, pb, runsCount, category, index = 0 }: LeaderboardRowProps) => {
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
    <tr 
      className={`group border-b border-border hover:bg-secondary/50 transition-colors animate-fade-in opacity-0 ${isTopThree ? 'bg-secondary/30' : ''}`}
      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
    >
      {/* Rank */}
      <td className="py-4 px-4">
        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${getRankStyle(rank)} ${getRankGlow(rank)}`}>
          {rank <= 3 ? <Trophy className="h-4 w-4" /> : rank}
        </div>
      </td>

      {/* Username */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/50 to-primary/20 flex items-center justify-center text-xs font-bold text-primary">
            {username.charAt(0).toUpperCase()}
          </div>
          <span className={`font-medium ${isTopThree ? 'text-foreground' : 'text-secondary-foreground'} group-hover:text-primary transition-colors`}>
            {username}
          </span>
        </div>
      </td>

      {/* PB */}
      <td className="py-4 px-4">
        <span className="font-mono text-primary font-semibold">{pb}</span>
      </td>

      {/* Runs */}
      <td className="py-4 px-4 text-muted-foreground">
        {runsCount}
      </td>

      {/* Category */}
      <td className="py-4 px-4">
        <span className="px-2 py-1 rounded-md bg-secondary text-muted-foreground text-xs">
          {category}
        </span>
      </td>
    </tr>
  );
};

export default LeaderboardRow;
