"use client";

import CodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror";
import { devRun } from "./theme";
import { javascript } from "@codemirror/lang-javascript";
import { rust } from "@codemirror/lang-rust";
import { go } from "@codemirror/lang-go";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { useEffect, useRef, useState } from "react";
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
  const scheduledTimeouts = useRef<NodeJS.Timeout[]>([]);

  // WebSocket connection
  useEffect(() => {
    if (!run) return;

    const ws = new WebSocket(`ws://${window.location.host}/api/view-run`);

    ws.onopen = () => {
      ws.send(run.id);
    };

    ws.onmessage = (m) => {
      const data: LiveRunMove[] = JSON.parse(m.data);

      data.forEach((move) => {
        const timeout = setTimeout(() => {
          if (!editorView) return;

          editorView.dispatch({
            selection: { anchor: move.cursor },
            scrollIntoView: true,
            changes: move.changes,
          });
        }, move.latency);

        scheduledTimeouts.current.push(timeout);
      });
    };

    return () => ws.close();
  }, [run]);

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
