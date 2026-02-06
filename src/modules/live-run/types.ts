export interface LiveRun {
  username: string;
  start: number;
  runsCount: number;
  problem: string;
  category: "any%" | "100%";
}

export interface Run {
  id: number;
  username: string;
  problem: string;
  category: string;
  time: string;
  pace: string;
  status: string;
}
