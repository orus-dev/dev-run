import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
    easy: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    medium: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
    hard: "bg-red-500/10 text-red-400 border border-red-500/30",
  };

  const difficultyLabels = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };

  return (
    <Card
      className={cn(
        "group relative cursor-pointer overflow-hidden",
        "animate-fade-in opacity-0 h-full",
        "card-hover gap-3",
      )}
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: "forwards",
      }}
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Header */}
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {problem.title}
          <Badge
            variant="secondary"
            className={cn(
              "text-xs font-medium text-green-600",
              difficultyStyles[problem.difficulty],
            )}
          >
            {difficultyLabels[problem.difficulty]}
          </Badge>
        </CardTitle>

        <CardDescription className="truncate whitespace-nowrap max-w-full">
          {problem.description}
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col gap-3">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
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

          {problem.language && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Code className="h-3 w-3" />
              {problem.language}
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="absolute bottom-4 right-4 p-0 opacity-0 group-hover:opacity-100 transition-all">
        <Button
          size="icon"
          onClick={async () => {
            await fetch(`http://127.0.0.1:63780/start-run/${problem.id}`);
            window.open("vscode://", "_blank");
          }}
        >
          <Zap className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProblemCard;
