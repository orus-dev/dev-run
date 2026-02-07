export interface LiveRun {
  id: string;
  username: string;
  views: number;
  start: number;
  runsCount: number;
  problem: string;
  category: "any%" | "100%";
}

export interface LiveRunMove {
  latency: number;
  cursor: number;
  changes?: {
    from: number;
    to: number;
    insert: string;
  };
}
