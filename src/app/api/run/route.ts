import { WebSocketServer, WebSocket } from "ws";
import { randomUUID } from "crypto";
import { createClientCookie } from "@/lib/supabase/server";
import { getSession } from "@/modules/account/core";
import * as Core from "@/modules/live-run/core";
import { ClientMessage } from "./types";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const headers = new Headers();
  headers.set("Connection", "Upgrade");
  headers.set("Upgrade", "websocket");
  return new Response("Upgrade Required", { status: 426, headers });
}

export function UPGRADE(client: WebSocket, server: WebSocketServer) {
  client.once("message", async (raw) => {
    const { cookies }: { cookies: Record<string, string> } = JSON.parse(
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

    client.send(JSON.stringify({ ok: true }));

    client.on("message", async (raw) => {
      try {
        const msg: ClientMessage = JSON.parse(raw.toString());

        switch (msg.type) {
          /* ---------------- CREATE ---------------- */
          case "create": {
            const { problem, category } = msg;

            if (!problem || !category) {
              client.send(
                JSON.stringify({
                  ok: false,
                  error: "problem and category required",
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
                ok: true,
                type: "create",
                data: { runId },
              }),
            );
            break;
          }

          /* ---------------- DELETE ---------------- */
          case "move": {
            const { runId, moves, file, language } = msg;

            if (
              !runId ||
              !moves ||
              file === undefined ||
              language === undefined
            ) {
              client.send(
                JSON.stringify({
                  ok: false,
                  error: "body requires runId, moves, file and language",
                }),
              );
              return;
            }

            const liveRun = await Core.getLiveRun(runId);

            if (!liveRun) {
              client.send(
                JSON.stringify({
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
                ok: true,
                type: "move",
                data: run,
              }),
            );

            break;
          }

          /* ---------------- SUBMIT ---------------- */
          case "submit": {
            const { runId } = msg;

            if (!runId) {
              client.send(
                JSON.stringify({ ok: false, error: "runId required" }),
              );
              return;
            }

            const liveRun = await Core.getLiveRun(runId);

            if (!liveRun) {
              client.send(
                JSON.stringify({
                  ok: false,
                  error: "Run is not live or does not exist",
                }),
              );
              return;
            }

            const run = await Core.submitRun(supabase, liveRun, session[0].id);

            client.send(
              JSON.stringify({
                ok: true,
                type: "submit",
                data: run,
              }),
            );
            break;
          }

          /* ---------------- DELETE ---------------- */
          case "delete": {
            const { runId } = msg;

            if (!runId) {
              client.send(
                JSON.stringify({ ok: false, error: "runId required" }),
              );
              return;
            }

            const run = await Core.removeLiveRun(runId);

            client.send(
              JSON.stringify({
                ok: true,
                type: "delete",
                data: run,
              }),
            );
            break;
          }

          default:
            client.send(
              JSON.stringify({
                ok: false,
                error: "Unknown message type",
              }),
            );
        }
      } catch (err) {
        console.error(err);
        client.send(
          JSON.stringify({
            ok: false,
            error: "Malformed message",
          }),
        );
      }
    });
  });

  client.on("close", () => {
    // optional cleanup
  });
}
