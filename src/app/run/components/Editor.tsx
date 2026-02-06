"use client";

import CodeMirror, { EditorState } from "@uiw/react-codemirror";
import { devRun } from "./theme/theme";
import { javascript } from "@codemirror/lang-javascript";
import { rust } from "@codemirror/lang-rust";
import { go } from "@codemirror/lang-go";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";

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

export default function Editor() {
  return (
    <CodeMirror
      readOnly
      className="h-full w-full"
      value={`// Import the necessary React library features
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
root.render(<App />); `}
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
        view.dispatch({
          selection: { anchor: 1 },
          scrollIntoView: true,
        });
      }}
    />
  );
}
