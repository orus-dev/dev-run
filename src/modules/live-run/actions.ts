"use server";

import { createClient } from "@/lib/supabase/server";
import { getSession, getSessionRedirect } from "../account/core";
import * as Core from "./core";
import { LiveRun, Run } from "./types";

export async function getLiveRuns(): Promise<Run[]> {
  const supabase = await createClient();

  const _ = await getSession(supabase);

  return [
    {
      id: 1,
      username: "speedmaster_x",
      problem: "Two Sum Dash",
      category: "Any%",
      time: "1:52.34",
      pace: "-0:03",
      status: "pb",
    },
    {
      id: 2,
      username: "algo_ninja",
      problem: "Binary Sprint",
      category: "Any%",
      time: "2:04.11",
      pace: "+0:05",
      status: "normal",
    },
    {
      id: 3,
      username: "stackattack",
      problem: "String Scramble",
      category: "Easy",
      time: "0:48.92",
      pace: "-0:01",
      status: "pb",
    },
    {
      id: 4,
      username: "reset_king",
      problem: "Linked List Rush",
      category: "Any%",
      time: "1:31.77",
      pace: "+0:12",
      status: "danger",
    },
  ];
}

export async function getLiveRun(): Promise<LiveRun> {
  return {
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
