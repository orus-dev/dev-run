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
  moveId: number;
  changes?: {
    from: number;
    to: number;
    insert: string;
  };
}

export interface LiveRunEvent {
  moves: LiveRunMove[];
  file: string | null;
  language: string | null;
  text: string | null;
}
