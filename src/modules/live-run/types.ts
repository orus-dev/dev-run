export interface LiveRun {
  id: string;
  username: string;
  views: number;
  start: number;
  runsCount: number;
  problem: string;
  category: "any%" | "100%";
}
