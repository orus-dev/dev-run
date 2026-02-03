import { Clock, Zap, Users } from "lucide-react";

interface ProblemCardProps {
  name: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  bestTime?: string;
  attempts: number;
  index?: number;
}

const ProblemCard = ({
  name,
  difficulty,
  tags,
  bestTime,
  attempts,
  index = 0,
}: ProblemCardProps) => {
  const difficultyStyles = {
    easy: "diff-easy",
    medium: "diff-medium",
    hard: "diff-hard",
  };

  const difficultyLabels = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };

  return (
    <div
      className={`group relative bg-card border border-border rounded-xl p-5 card-hover cursor-pointer animate-fade-in opacity-0`}
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: "forwards",
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${difficultyStyles[difficulty]}`}
          >
            {difficultyLabels[difficulty]}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-md bg-secondary text-muted-foreground text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {bestTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-mono">{bestTime}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{attempts} runs</span>
          </div>
        </div>

        {/* Quick run button - appears on hover */}
        <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <button className="p-2 rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
