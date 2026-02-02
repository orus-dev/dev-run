import { Play, Pause, RotateCcw, Flag, ChevronRight } from "lucide-react";
import SplitRow from "@/components/app/SplitRow";
import { Button } from "@/components/ui/button";

const Run = () => {
  const splits = [
    {
      problemName: "Two Sum Dash",
      splitTime: "0:38",
      delta: "-0:04",
      isCompleted: true,
      pbTime: "0:42",
    },
    {
      problemName: "Binary Sprint",
      splitTime: "1:12",
      delta: "+0:02",
      isCompleted: true,
      pbTime: "0:32",
    },
    {
      problemName: "String Scramble",
      splitTime: "--:--",
      delta: undefined,
      isCompleted: false,
      isCurrent: true,
      pbTime: "0:55",
    },
    {
      problemName: "Linked List Rush",
      splitTime: "--:--",
      delta: undefined,
      isCompleted: false,
      pbTime: "1:24",
    },
    {
      problemName: "Stack Overflow",
      splitTime: "--:--",
      delta: undefined,
      isCompleted: false,
      pbTime: "1:42",
    },
  ];

  const runInfo = {
    category: "Any% Easy",
    problems: 5,
    pbTime: "4:35",
    worldRecord: "3:58",
    currentAttempt: 47,
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Timer Area */}
          <div className="lg:col-span-2">
            {/* Category Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <span>Category</span>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-primary">{runInfo.category}</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground">
                  Current Run
                </h1>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Attempt #{runInfo.currentAttempt}
                </p>
                <p className="text-xs text-muted-foreground">
                  WR:{" "}
                  <span className="text-primary font-mono">
                    {runInfo.worldRecord}
                  </span>
                </p>
              </div>
            </div>

            {/* Timer Display */}
            <div className="bg-card border border-border rounded-2xl p-8 mb-6 text-center relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

              <div className="relative">
                {/* Timer */}
                <div className="mb-6">
                  <p className="timer-display text-primary">1:52.34</p>
                  <p className="text-muted-foreground mt-2 font-mono text-sm">
                    PB: {runInfo.pbTime} | Diff:{" "}
                    <span className="text-red-400">+0:12</span>
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-secondary rounded-full h-2 mb-6">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300 glow-purple"
                    style={{ width: "40%" }}
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button variant="outline" size="lg" className="gap-2">
                    <RotateCcw className="h-5 w-5" />
                    Reset
                  </Button>
                  <Button variant="hero" size="xl" className="gap-2">
                    <Pause className="h-6 w-6" />
                    Pause
                  </Button>
                  <Button variant="destructive" size="lg" className="gap-2">
                    <Flag className="h-5 w-5" />
                    End Run
                  </Button>
                </div>
              </div>
            </div>

            {/* Current Problem */}
            <div className="bg-card border border-primary/30 rounded-xl p-6 glow-purple">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-primary font-medium">
                    Problem 3 of 5
                  </p>
                  <h2 className="text-2xl font-bold text-foreground">
                    String Scramble
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-lg diff-easy text-sm font-medium">
                  Easy
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 rounded-md bg-secondary text-muted-foreground text-xs">
                  strings
                </span>
                <span className="px-2 py-1 rounded-md bg-secondary text-muted-foreground text-xs">
                  manipulation
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  PB Split: <span className="text-primary font-mono">0:55</span>
                </span>
                <span>|</span>
                <span>
                  Best: <span className="text-emerald-400 font-mono">0:38</span>
                </span>
              </div>

              <Button className="w-full mt-6 gap-2" variant="default">
                <Play className="h-5 w-5" />
                Complete Split
              </Button>
            </div>
          </div>

          {/* Splits Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Splits</h3>
                <span className="text-xs text-muted-foreground">
                  2/5 Complete
                </span>
              </div>

              <div className="space-y-2">
                {splits.map((split) => (
                  <SplitRow key={split.problemName} {...split} />
                ))}
              </div>

              {/* Sum of Best */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sum of Best</span>
                  <span className="font-mono text-emerald-400">3:51</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Personal Best</span>
                  <span className="font-mono text-primary">
                    {runInfo.pbTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card border border-border rounded-xl p-4 mt-4">
              <h3 className="font-semibold text-foreground mb-4">
                Session Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">
                    Runs Today
                  </span>
                  <span className="font-mono text-foreground">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">
                    Clean Runs
                  </span>
                  <span className="font-mono text-emerald-400">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Resets</span>
                  <span className="font-mono text-red-400">9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">
                    Time Played
                  </span>
                  <span className="font-mono text-foreground">1:42:31</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Run;
