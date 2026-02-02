"use client";

import { FileTree } from "@sinm/react-file-tree";
import CodeMirror, { EditorState } from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

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
  const runInfo: RunInfo = {
    category: "any%",
    problems: 5,
    pbTime: "4:35",
    worldRecord: "3:58",
    currentAttempt: 47,
  };

  const chatMessages: ChatMessage[] = [
    { user: "Alice", message: "Nice split!", time: "1:53" },
    { user: "Bob", message: "Watch out for the string problem!", time: "1:54" },
    { user: "Charlie", message: "PB incoming? 👀", time: "1:55" },
  ];

  return (
    <div className="h-svh px-20 pt-24 pb-12 flex gap-8">
      {/* Editor */}
      <Card className="flex-1 overflow-hidden">
        <CardContent className="flex h-full">
          {/* File tree */}
          <div className="w-2xs border-r border-border">
            <FileTree
              tree={{
                type: "directory",
                uri: "my-app",
                expanded: true,
                children: [{ type: "file", uri: "myfile.js" }],
              }}
            />
          </div>

          {/* Code */}
          <div className="flex-1 pl-5 flex flex-col">
            <header className="text-sm font-medium text-muted-foreground">
              myfile.js
            </header>

            <div className="flex-1 pt-3 pb-5">
              <CodeMirror
                readOnly
                className="h-full w-full"
                value="yo"
                extensions={[
                  EditorState.transactionFilter.of((tr) => {
                    if (tr.selection && tr.isUserEvent("select")) {
                      return [];
                    }
                    return tr;
                  }),
                ]}
                theme={vscodeDark}
                onCreateEditor={(view) => {
                  view.focus();
                  view.dispatch({
                    selection: { anchor: 1 },
                    scrollIntoView: true,
                  });
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timer & Chat */}
      <div className="flex flex-col gap-6 h-full w-sm">
        <RunTimer runInfo={runInfo} />
        <RunChat chatMessages={chatMessages} />
      </div>
    </div>
  );
}

/* ---------------- Timer ---------------- */

function RunTimer({ runInfo }: { runInfo: RunInfo }) {
  return (
    <Card className="relative text-center overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
      <CardContent className="relative">
        <p className="timer-display text-primary text-4xl font-bold">1:52.34</p>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          PB: {runInfo.pbTime} | Diff:{" "}
          <span className="text-red-400">+0:12</span>
        </p>
      </CardContent>
    </Card>
  );
}

/* ---------------- Chat ---------------- */

function RunChat({ chatMessages }: { chatMessages: ChatMessage[] }) {
  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Chat</CardTitle>
          <span className="text-xs text-muted-foreground">
            {chatMessages.length} messages
          </span>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col flex-1 gap-3">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {chatMessages.map((msg, i) => (
            <div key={i} className="rounded-lg bg-secondary/50 p-2 text-sm">
              <span className="font-semibold text-foreground">{msg.user}</span>:{" "}
              <span className="text-muted-foreground">{msg.message}</span>
              <span className="ml-2 text-xs text-muted-foreground">
                {msg.time}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <Input placeholder="Type a message…" />
      </CardContent>
    </Card>
  );
}
