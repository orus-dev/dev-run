export type ClientMessage =
  | {
      type: "create";
      problem: string;
      category: "any%" | "100%";
    }
  | {
      type: "move";
      runId: string;
      // moves, file, language
    }
  | {
      type: "submit";
      runId: string;
    }
  | {
      type: "delete";
      runId: string;
    };

export type ServerMessage =
  | { ok: true; type: string; data?: any }
  | { ok: false; error: string };
