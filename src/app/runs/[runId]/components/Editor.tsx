"use client";

import CodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror";
import { devRun } from "./theme";
import { javascript } from "@codemirror/lang-javascript";
import { rust } from "@codemirror/lang-rust";
import { go } from "@codemirror/lang-go";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { useEffect, useState } from "react";
import useAction from "@/hook/use-action";
import { getLiveRunMoves } from "@/modules/live-run/actions";
import { LiveRun, LiveRunMove } from "@/modules/live-run/types";

type Language =
  | "javascript"
  | "typescript"
  | "rust"
  | "go"
  | "python"
  | "java"
  | "json";

function getLanguageExtension(lang: Language) {
  switch (lang) {
    case "javascript":
      return javascript();
    case "rust":
      return rust();
    case "go":
      return go();
    case "python":
      return python();
    case "java":
      return java();
    case "json":
      return json();
    default:
      return javascript();
  }
}

export default function Editor({ run }: { run: LiveRun | null | undefined }) {
  const [editorView, setEditorView] = useState<EditorView>();
  const [rawMoves] = useAction<LiveRunMove[]>(
    async () => (run ? await getLiveRunMoves(run.id) : []),
    [run],
  );

  const [lastMoveId, setLastMoveId] = useState<number>(-1);
  const [moves, setMoves] = useState<LiveRunMove[]>([]);

  useEffect(() => {
    let moves = rawMoves?.filter((move) => move.moveId > lastMoveId) || [];

    if (moves.length === 0) return;

    setMoves(moves);
    setLastMoveId(lastMoveId + moves.length);

    if (rawMoves?.length || 0 > 0) {
      console.log("raw", rawMoves);
    }
  }, [rawMoves]);

  useEffect(() => {
    if (moves.length > 0) {
      console.log("moves", moves);
    }
  }, [moves]);

  useEffect(() => {
    if (!editorView || !moves) return;

    let cancelled = false;

    const executeMove = async (move: LiveRunMove) => {
      return new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          if (!editorView || cancelled) return resolve();

          editorView.dispatch({
            // selection: { anchor: move.cursor },
            scrollIntoView: true,
            changes: move.changes,
          });

          resolve();
        }, move.latency);

        return () => clearTimeout(timeout);
      });
    };

    (async () => {
      if (!moves) return;
      for (const move of moves) {
        if (cancelled) break;
        await executeMove(move);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [moves]);

  return (
    <CodeMirror
      readOnly
      className="h-full w-full"
      value={``}
      extensions={[
        getLanguageExtension("javascript"),
        EditorState.transactionFilter.of((tr) => {
          if (tr.selection && tr.isUserEvent("select")) {
            return [];
          }
          return tr;
        }),
      ]}
      theme={devRun}
      onCreateEditor={(view) => {
        view.focus();
        setEditorView(view);
      }}
    />
  );
}
