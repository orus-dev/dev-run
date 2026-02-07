import Rank from "@/components/app/Rank";
import { LinkIcon, Trophy } from "lucide-react";
import Link from "next/link";

interface GlobalLeaderboardUser {
  rank: number;
  user_id: string;
  username: string;
  wins: number;
  podiums: number;
  problems_completed: number;
}

const LeaderboardRow = ({
  index = 0,
  run,
}: {
  index?: number;
  run: GlobalLeaderboardUser;
}) => {
  const isTopThree = run.rank <= 3;

  return (
    <tr
      className={`group border-b border-border hover:bg-secondary/50 transition-colors animate-fade-in opacity-0 ${
        isTopThree ? "bg-secondary/30" : ""
      }`}
      style={{
        animationDelay: `${index * 0.05}s`,
        animationFillMode: "forwards",
      }}
    >
      {/* Rank */}
      <td className="py-4 px-5 w-16">
        <Rank rank={run.rank} />
      </td>

      {/* Username */}
      <td>
        <div className="flex items-center gap-3">
          <span
            className={`font-medium ${
              isTopThree ? "text-foreground" : "text-secondary-foreground"
            } group-hover:text-primary transition-colors`}
          >
            {run.username}
          </span>
        </div>
      </td>

      {/* Wins */}
      <td className="py-4 px-4 text-center font-mono font-semibold text-primary">
        {run.wins}
      </td>

      {/* Podiums */}
      <td className="py-4 px-4 text-center font-mono font-semibold text-primary">
        {run.podiums}
      </td>

      {/* Problems Completed */}
      <td className="py-4 px-4 text-center font-mono font-semibold text-primary">
        {run.problems_completed}
      </td>

      {/* Profile Link */}
      <td className="py-4 px-4">
        <Link
          href={`/profile/${run.user_id}`}
          className="hover:text-primary flex items-center gap-1"
        >
          <LinkIcon className="w-3 h-3" /> View Profile
        </Link>
      </td>
    </tr>
  );
};

export default LeaderboardRow;
