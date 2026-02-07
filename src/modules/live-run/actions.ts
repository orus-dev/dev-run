"use server";

import { createClient } from "@/lib/supabase/server";
import { getSession, getSessionRedirect } from "../account/core";
import * as Core from "./core";
import { LiveRun } from "./types";

export async function getLiveRuns(): Promise<LiveRun[]> {
  const supabase = await createClient();

  const _ = await getSession(supabase);

  return [
    {
      id: "1",
      username: "speedmaster_x",
      problem: "Two Sum Dash",
      category: "any%",
      runsCount: 1,
      start: new Date().getTime(),
    },
    {
      id: "2",
      username: "algo_ninja",
      problem: "Binary Sprint",
      category: "any%",
      runsCount: 1,
      start: new Date().getTime(),
    },
    {
      id: "3",
      username: "stackattack",
      problem: "String Scramble",
      category: "any%",
      runsCount: 1,
      start: new Date().getTime(),
    },
    {
      id: "4",
      username: "reset_king",
      problem: "Linked List Rush",
      category: "any%",
      runsCount: 1,
      start: new Date().getTime(),
    },
  ];
}

export async function getLiveRun(): Promise<LiveRun> {
  return {
    id: "0",
    username: "selimaj",
    start: new Date().getTime(),
    problem: "solve",
    category: "any%",
    runsCount: 0,
  };
}

export async function getLiveRunMoves() {
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

  const chunks = [];
  for (let i = 0; i < code.length; i += 4) {
    chunks.push(code.slice(i, i + 4));
  }

  return chunks.map((chunk, index) => ({
    latency: 120, // 100ms per chunk
    cursor: index * 4, // approximate cursor position
    changes: {
      from: index * 4,
      to: index * 4,
      insert: chunk,
    },
  }));
}
