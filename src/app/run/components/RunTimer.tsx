import { Card, CardContent } from "@/components/ui/card";

export type RunInfo = {
  category: "any%" | "100%";
  problems: number;
  currentAttempt: number;
  pbTime: string;
  worldRecord: string;
};

export default function RunTimer({ runInfo }: { runInfo: RunInfo }) {
  return (
    <Card className="relative text-center overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
      <CardContent className="relative">
        <p className="timer-display text-primary text-4xl font-bold">1:52.34</p>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          PB: {runInfo.pbTime} | Diff:{" "}
          <span className="text-red-400">+0:12</span>
        </p>
      </CardContent>
    </Card>
  );
}
