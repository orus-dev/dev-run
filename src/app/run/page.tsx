"use client";

import { Card, CardContent } from "@/components/ui/card";
import RunTimer from "./components/RunTimer";
import RunChat, { ChatMessage } from "./components/RunChat";
import { FileTree } from "./components/FileTree";
import { File } from "lucide-react";
import Editor from "./components/Editor";
import useAction, { useActionInterval } from "@/hook/use-action";
import { getLiveRun } from "@/modules/live-run/actions";
import ProblemCard from "../problems/components/ProblemCard";
import ProfileCard from "./components/ProfileCard";
import { getProblem } from "@/modules/problems/actions";

export default function Run() {
  const [run] = useActionInterval(getLiveRun, 1000);
  const [problem] = useAction(
    async () => (run?.id ? getProblem(run.problem) : null),
    [run],
  );

  console.log(problem);

  const chatMessages: ChatMessage[] = [
    { user: "Alice", message: "Nice split!", time: "1:53" },
    { user: "Bob", message: "Watch out for the string problem!", time: "1:54" },
    { user: "Charlie", message: "PB incoming? 👀", time: "1:55" },
  ];

  return (
    <div
      className="
        h-svh
        px-4 sm:px-8 lg:px-20
        pt-20 sm:pt-24
        pb-6 sm:pb-12
        flex flex-col lg:flex-row
        gap-5
      "
    >
      {/* Main column */}
      <div className="h-full w-full flex flex-col gap-4">
        {/* Top cards */}
        <div className="w-full flex flex-wrap gap-4 md:gap-5">
          <div className="flex-1 animate-fade-in opacity-0">
            <ProfileCard user={{ username: "selimaj", rank: 1 }} />
          </div>

          <div className="flex-1 animate-fade-in opacity-0 stagger-2">
            {run && <RunTimer run={run} />}
          </div>

          <div className="flex-2">
            {problem && <ProblemCard index={4} problem={problem} />}
          </div>
        </div>

        {/* Editor */}
        <Card className="flex-1 h-svh overflow-hidden">
          <CardContent className="flex h-full">
            {/* File tree – hide on small screens */}
            <div className="hidden md:block w-2xs border-r border-border">
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
            <div className="flex-1 w-full max-h-svh md:max-h-full h-full pl-0 md:pl-5 flex flex-col">
              <header className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <File size={16} /> myfile.js
              </header>
              <div className="flex-1 pt-3 pb-4 md:pb-5 w-full h-full">
                <Editor />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timer & Chat */}
      <div className="flex lg:w-lg min-h-[60vh]">
        <RunChat chatMessages={chatMessages} />
      </div>
    </div>
  );
}
