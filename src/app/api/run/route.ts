import { WebSocketServer, WebSocket } from "ws";
import { randomUUID } from "crypto";
import { createClientCookie } from "@/lib/supabase/server";
import { getSession } from "@/modules/account/core";
import * as Core from "@/modules/live-run/core";
import { ClientMessage } from "./types";
import { NextRequest } from "next/server";
import { redis } from "@/lib/redis";

export function UPGRADE(client: WebSocket, server: WebSocketServer) {
  client.once("message", async (raw) => {
    const {
      cookies,
      requestId,
    }: { cookies: Record<string, string>; requestId: string } = JSON.parse(
      raw.toString(),
    );

    if (!cookies) {
      client.send(JSON.stringify({ ok: false, error: "Missing cookies" }));
      client.close();
      return;
    }

    const supabase = await createClientCookie(new Map(Object.entries(cookies)));
    const session = await getSession(supabase);

    if (!session) {
      client.send(JSON.stringify({ ok: false, error: "Invalid session" }));
      return;
    }

    client.send(JSON.stringify({ requestId, ok: true }));

    let currentRun: string | undefined;

    client.on("message", async (raw) => {
      try {
        const { requestId, ...msg }: ClientMessage = JSON.parse(raw.toString());

        switch (msg.type) {
          /* ---------------- CREATE ---------------- */
          case "create": {
            const { problem, category } = msg;

            if (!problem || !category) {
              client.send(
                JSON.stringify({
                  requestId,
                  ok: false,
                  error: "problem and category required",
                }),
              );
              return;
            }

            if (currentRun) {
              client.send(
                JSON.stringify({
                  requestId,
                  ok: false,
                  error:
                    "Cannot do multiple runs at a time, please delete or submit the current run",
                }),
              );
              return;
            }

            const runId = randomUUID();

            await Core.addLiveRun({
              id: runId,
              problem,
              category,
              username: session[1].username,
              views: 0,
              start: Date.now(),
              runsCount: 0,
            });

            client.send(
              JSON.stringify({
                requestId,
                ok: true,
                type: "create",
                data: { runId },
              }),
            );
            break;
          }

          /* ---------------- DELETE ---------------- */
          case "move": {
            const { moves, file, language } = msg;

            if (!currentRun) {
              client.send(
                JSON.stringify({
                  requestId,
                  ok: false,
                  error: "No current run, please create a run first",
                }),
              );
              return;
            }

            if (!moves || file === undefined || language === undefined) {
              client.send(
                JSON.stringify({
                  requestId,
                  ok: false,
                  error: "body requires runId, moves, file and language",
                }),
              );
              return;
            }

            const liveRun = await Core.getLiveRun(currentRun);

            if (!liveRun) {
              client.send(
                JSON.stringify({
                  requestId,
                  ok: false,
                  error: "Run is not live or does not exist",
                }),
              );
              return;
            }

            const run = await Core.addLiveRunEvent(
              liveRun.id,
              file,
              language,
              moves,
            );

            client.send(
              JSON.stringify({
                requestId,
                ok: true,
                type: "move",
                data: run,
              }),
            );

            break;
          }

          /* ---------------- SUBMIT ---------------- */
          case "submit": {
            if (!currentRun) {
              client.send(
                JSON.stringify({
                  requestId,
                  ok: false,
                  error: "No current run, please create a run first",
                }),
              );
              return;
            }

            const liveRun = await Core.getLiveRun(currentRun);

            if (!liveRun) {
              client.send(
                JSON.stringify({
                  requestId,
                  ok: false,
                  error: "Run is not live or does not exist",
                }),
              );
              return;
            }

            const run = await Core.submitRun(supabase, liveRun, session[0].id);

            client.send(
              JSON.stringify({
                requestId,
                ok: true,
                type: "submit",
                data: run,
              }),
            );
            break;
          }

          /* ---------------- DELETE ---------------- */
          case "delete": {
            if (!currentRun) {
              client.send(
                JSON.stringify({
                  requestId,
                  ok: false,
                  error: "No current run, please create a run first",
                }),
              );
              return;
            }

            const run = await Core.removeLiveRun(currentRun);

            client.send(
              JSON.stringify({
                requestId,
                ok: true,
                type: "delete",
                data: run,
              }),
            );
            break;
          }

          case "getText":
            if (!currentRun) {
              client.send(
                JSON.stringify({
                  requestId,
                  ok: false,
                  error: "No current run, please create a run first",
                }),
              );
              return;
            }

            const data = await redis.get(`liveRunText:${currentRun}`);

            client.send(
              JSON.stringify({
                requestId,
                ok: true,
                data,
              }),
            );
            break;

          default:
            client.send(
              JSON.stringify({
                requestId,
                ok: false,
                error: "Unknown message type",
              }),
            );
        }
      } catch (err) {
        console.error(err);
        client.send(
          JSON.stringify({
            requestId,
            ok: false,
            error: "Malformed message",
          }),
        );
      }
    });

    client.on("close", async () => {
      if (!currentRun) return;

      Core.removeLiveRun(currentRun);
      await redis.del(`liveRunText:${currentRun}`);
    });
  });
}

export function GET(req: NextRequest) {
  const headers = new Headers();
  headers.set("Connection", "Upgrade");
  headers.set("Upgrade", "websocket");
  return new Response("Upgrade Required", { status: 426, headers });
}
