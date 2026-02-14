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
import { LiveRun, LiveRunEvent, LiveRunMove } from "@/modules/live-run/types";
import useAction from "@/hook/use-action";
import { getOrigin } from "@/lib/origin/client";

type Language =
  | "javascript"
  | "typescript"
  | "rust"
  | "go"
  | "python"
  | "java"
  | "json";

function getLanguageExtension(lang: Language | null) {
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

export default function Editor({
  run,
  onEvent,
}: {
  run: LiveRun | null | undefined;
  onEvent: (s: LiveRunEvent) => void;
}) {
  const [origin] = useAction(getOrigin);
  const [editorView, setEditorView] = useState<EditorView>();
  const scheduledTimeouts = useRef<NodeJS.Timeout[]>([]);
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<Language | null>(null);

  // WebSocket connection
  useEffect(() => {
    if (!run || !origin?.wsOrigin) return;

    const ws = new WebSocket(`${origin.wsOrigin}/api/view-run`);

    ws.onopen = () => {
      ws.send(run.id);
    };

    ws.onmessage = (m) => {
      const data: LiveRunEvent = JSON.parse(m.data);

      onEvent(data);

      if (data.language !== language) {
        setLanguage(data.language as Language);
      }

      if (data.text) {
        setText(data.text);
      }

      let cancelled = false;

      data.moves.forEach((move) => {
        const timeout = setTimeout(() => {
          if (!editorView || cancelled) return;

          try {
            editorView.dispatch({
              selection: { anchor: move.cursor },
              scrollIntoView: true,
              changes: move.changes,
            });
          } catch {
            cancelled = true;
            ws.send("getText");
          }
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
      value={text}
      extensions={[
        getLanguageExtension(language),
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
