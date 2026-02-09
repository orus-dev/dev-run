import { Card, CardContent } from "@/components/ui/card";
import formatTime from "@/lib/time-format";
import { LiveRun } from "@/modules/live-run/types";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

export default function RunTimer({
  run,
  views,
}: {
  run: LiveRun;
  views: number | null;
}) {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    // Update function calculates elapsed time
    const updateTime = () => setTime(formatTime(Date.now() - run.start));

    // Update immediately and then every second
    updateTime();
    const interval = setInterval(updateTime, 50);

    return () => clearInterval(interval); // cleanup on unmount
  }, [run.start]);

  return (
    <Card className="relative text-center overflow-hidden h-full">
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
      <CardContent className="relative flex flex-col justify-center items-center h-full">
        <p className="timer-display text-primary text-3xl font-bold">{time}</p>
        <span className="flex gap-4">
          <p className="text-muted-foreground flex gap-1 items-center">
            {run.category}
          </p>
          <p className="text-muted-foreground flex gap-1 items-center">
            <Eye className="w-4 h-4" />
            {views || run.views}
          </p>
        </span>
      </CardContent>
    </Card>
  );
}
