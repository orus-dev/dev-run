import { Card, CardContent } from "@/components/ui/card";
import { LiveRun } from "@/modules/live-run/types";
import { useEffect, useState } from "react";

export default function RunTimer({ runInfo }: { runInfo: LiveRun }) {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    // Update function calculates elapsed time
    const updateTime = () => {
      const elapsedMs = Date.now() - runInfo.start;

      const totalSeconds = elapsedMs / 1000;
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
        2,
        "0",
      );
      const seconds = (totalSeconds % 60).toFixed(2);

      setTime(
        `${totalSeconds / 3600 >= 1 ? hours + ":" : ""}${minutes}:${seconds}`,
      );
    };

    // Update immediately and then every second
    updateTime();
    const interval = setInterval(updateTime, 50);

    return () => clearInterval(interval); // cleanup on unmount
  }, [runInfo.start]);

  return (
    <Card className="relative text-center overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
      <CardContent className="relative">
        <p className="timer-display text-primary text-4xl font-bold">{time}</p>
      </CardContent>
    </Card>
  );
}
