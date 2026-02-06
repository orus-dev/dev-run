"use client";

import { Card, CardContent } from "@/components/ui/card";
import RunTimer, { RunInfo } from "./components/RunTimer";
import RunChat, { ChatMessage } from "./components/RunChat";
import { FileTree } from "./components/FileTree";
import { File } from "lucide-react";
import Editor from "./components/Editor";

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
                children: [
                  { type: "file", uri: "myfile.js" },
                  {
                    type: "directory",
                    uri: "my-app",
                    children: [{ type: "file", uri: "myfile.js" }],
                  },
                ],
              }}
            />
          </div>

          {/* Code */}
          <div className="flex-1 pl-5 flex flex-col">
            <header className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <File size={16} /> myfile.js
            </header>
            <div className="flex-1 pt-3 pb-5 h-full">
              <Editor />
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
