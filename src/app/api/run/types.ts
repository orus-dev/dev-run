import { LiveRunMove } from "@/modules/live-run/types";

export type ClientMessage =
  | {
      type: "create";
      problem: string;
      category: "any%" | "100%";
    }
  | {
      type: "move";
      runId: string;
      file: string;
      language: string;
      moves: LiveRunMove[];
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
