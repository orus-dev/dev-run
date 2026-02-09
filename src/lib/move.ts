import { LiveRunMove } from "@/modules/live-run/types";

export function applyMoves(text: string, moves: LiveRunMove[]) {
  let result = text;

  for (const move of moves) {
    if (!move.changes) continue;

    result =
      result.slice(0, move.changes.from) +
      move.changes.insert +
      result.slice(move.changes.to);
  }

  return result;
}
