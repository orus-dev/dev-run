export interface LiveRun {
  id: string;
  username: string;
  start: number;
  runsCount: number;
  problem: string;
  category: "any%" | "100%";
}
