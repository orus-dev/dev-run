import { Button } from "@/components/ui/button";
import { Problem } from "@/modules/problems/types";
import { Clock, Zap, Users, Code } from "lucide-react";

const ProblemCard = ({
  problem,
  index = 0,
  bestTime,
  attempts = 0,
}: {
  problem: Problem;
  index?: number;
  bestTime?: string;
  attempts?: number;
}) => {
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
      className="group relative bg-card border border-border rounded-xl p-5 card-hover cursor-pointer animate-fade-in opacity-0 h-full flex flex-col justify-between"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: "forwards",
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Content */}
      <div className="relative flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {problem.title}
          </h3>
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              difficultyStyles[problem.difficulty]
            }`}
          >
            {difficultyLabels[problem.difficulty]}
          </span>
        </div>

        {/* Tags / Meta */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs text-muted-foreground">
          {problem.language && (
            <span className="px-2 py-1 rounded-md bg-secondary">
              <Code className="w-3 h-3 inline-block mr-1" /> {problem.language}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground flex-1">
          {problem.description}
        </p>

        {/* Stats + Action */}
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
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

          {/* Quick run button */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button size="p2">
              <Zap className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
