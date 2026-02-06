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

type Move = {
  latency: number;
  cursor: number;
  changes: {
    from: number;
    to: number;
    insert: string;
  };
};

const code = `// Import the necessary React library features
import { createRoot } from 'react-dom/client';

// Define a functional component named "App"
// Component names must start with a capital letter
function App() {
  // Components return JSX markup
  return (
    <h1>Hello, world!</h1>
  );
}

// Target a DOM element in your HTML (e.g., <div id="root"></div>)
const domNode = document.getElementById('root');

// Create a root and render your component into the DOM
const root = createRoot(domNode);
root.render(<App />);`.repeat(3);

// Helper to split text into chunks of ~4 chars
function chunkText(text: string, size = 4) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

const chunks = chunkText(code, 4);

const moves: Move[] = chunks.map((chunk, index) => ({
  latency: 1, // 100ms per chunk
  cursor: index * 4, // approximate cursor position
  changes: {
    from: index * 4,
    to: index * 4,
    insert: chunk,
  },
}));

export default function Editor() {
  const [editorView, setEditorView] = useState<EditorView>();

  useEffect(() => {
    if (!editorView) return;

    let cancelled = false;

    const executeMove = async (move: Move) => {
      return new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          if (!editorView || cancelled) return resolve();

          editorView.dispatch({
            selection: { anchor: move.cursor },
            scrollIntoView: true,
            changes: move.changes,
          });

          resolve();
        }, move.latency);

        return () => clearTimeout(timeout);
      });
    };

    (async () => {
      for (const move of moves) {
        if (cancelled) break;
        await executeMove(move);
      }
    })();

    return () => {
      cancelled = true; // stop future moves
    };
  }, [editorView]);

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
