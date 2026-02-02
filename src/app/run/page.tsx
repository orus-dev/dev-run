"use client";

import { FileTree } from "@sinm/react-file-tree";

type RunInfo = {
  category: "any%" | "100%";
  problems: number;
  currentAttempt: number;
  pbTime: string;
  worldRecord: string;
};

type ChatMessage = {
  user: string;
  message: string;
  time: string;
};

export default function Run() {
  const splits = [
    {
      problemName: "Two Sum Dash",
      splitTime: "0:38",
      delta: "-0:04",
      isCompleted: true,
      pbTime: "0:42",
    },
    {
      problemName: "Binary Sprint",
      splitTime: "1:12",
      delta: "+0:02",
      isCompleted: true,
      pbTime: "0:32",
    },
    {
      problemName: "String Scramble",
      splitTime: "--:--",
      delta: undefined,
      isCompleted: false,
      isCurrent: true,
      pbTime: "0:55",
    },
    {
      problemName: "Linked List Rush",
      splitTime: "--:--",
      delta: undefined,
      isCompleted: false,
      pbTime: "1:24",
    },
    {
      problemName: "Stack Overflow",
      splitTime: "--:--",
      delta: undefined,
      isCompleted: false,
      pbTime: "1:42",
    },
  ];

  const runInfo: RunInfo = {
    category: "any%",
    problems: 5,
    pbTime: "4:35",
    worldRecord: "3:58",
    currentAttempt: 47,
  };

  const chatMessages = [
    { user: "Alice", message: "Nice split!", time: "1:53" },
    { user: "Bob", message: "Watch out for the string problem!", time: "1:54" },
    { user: "Charlie", message: "PB incoming? 👀", time: "1:55" },
  ];

  const codebase = [];

  return (
    <div className="h-svh px-20 pt-24 pb-12 flex gap-8">
      {/* Editor */}
      <div className="h-full w-full bg-card rounded-2xl flex overflow-clip">
        <div className="h-full w-2xs border-r-2 p-5">
          <FileTree
            tree={{
              type: "directory",
              uri: "my-app",
              children: [],
            }}
          />
        </div>
        <div className="h-full w-full overflow-y-scroll p-5">
          <header>myfile.js</header>
          <div className="mt-3"></div>
        </div>
      </div>

      {/* Timer & Chat */}
      <div className="flex flex-col gap-6 h-full">
        <Timer runInfo={runInfo} />
        <Chat chatMessages={chatMessages} />
      </div>
    </div>
  );
}

function Timer({ runInfo }: { runInfo: RunInfo }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 text-center relative">
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none rounded-t-2xl" />
      <div className="relative">
        <p className="timer-display text-primary text-4xl font-bold">1:52.34</p>
        <p className="text-muted-foreground mt-2 font-mono text-sm">
          PB: {runInfo.pbTime} | Diff:{" "}
          <span className="text-red-400">+0:12</span>
        </p>
      </div>
    </div>
  );
}

function Chat({ chatMessages }: { chatMessages: ChatMessage[] }) {
  return (
    <div className="h-full flex flex-col flex-1 w-sm bg-card border border-border rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Chat</h3>
        <span className="text-xs text-muted-foreground">
          {chatMessages.length} messages
        </span>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className="bg-secondary/50 rounded-lg p-2">
            <span className="font-semibold text-foreground">{msg.user}</span>:{" "}
            <span className="text-muted-foreground">{msg.message}</span>
            <span className="text-xs text-muted-foreground ml-2">
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full rounded-lg border border-border p-2 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}
