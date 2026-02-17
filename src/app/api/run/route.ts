import { WebSocketServer, WebSocket } from "ws";
import { randomUUID } from "crypto";
import { createClientCookie } from "@/lib/supabase/server";
import { getSession } from "@/modules/account/core";
import * as Core from "@/modules/live-run/core";
import { ClientMessage } from "./types";
import { redis } from "@/lib/redis";
import { User } from "@supabase/supabase-js";
import { UserProfile } from "@/modules/user/types";
import { NextRequest } from "next/server";

export function UPGRADE(client: WebSocket, server: WebSocketServer) {
  let authenticated = false;
  let session: [User, UserProfile] | null = null;
  let currentRun: string | undefined;

  // Heartbeat
  let isAlive = true;
  const heartbeatInterval = 15000;
  const heartbeat = setInterval(() => {
    if (!isAlive) {
      console.log("Client did not respond to ping, terminating");
      return closeClient("Heartbeat timeout");
    }
    isAlive = false;
    if (client.readyState === WebSocket.OPEN) client.ping();
  }, heartbeatInterval);

  client.on("pong", () => {
    isAlive = true;
  });

  const closeClient = (reason?: string) => {
    if (reason) console.warn("Closing client:", reason);
    try {
      client.close();
      setTimeout(() => {
        if (client.readyState !== WebSocket.CLOSED) client.terminate();
      }, 1000);
    } catch {}
  };

  const cleanupRun = async () => {
    if (currentRun) {
      try {
        await Core.removeLiveRun(currentRun);
      } catch (err) {
        console.error("Error cleaning up run:", err);
      }
      currentRun = undefined;
    }
  };

  client.on("message", async (raw) => {
    let requestId: string | undefined;

    try {
      const msg = JSON.parse(raw.toString());
      requestId = msg.requestId;

      // AUTHENTICATION
      if (!authenticated) {
        const { cookies } = msg as { cookies?: Record<string, string> };
        if (!cookies) return closeClient("Missing cookies");

        const supabase = await createClientCookie(
          new Map(Object.entries(cookies)),
        );
        session = await getSession(supabase);
        if (!session) return closeClient("Invalid session");

        authenticated = true;
        return client.send(JSON.stringify({ requestId, ok: true }));
      }

      if (!session) return closeClient("Session unexpectedly null");

      // POST-AUTH MESSAGE HANDLING
      const { type, ...payload } = msg as ClientMessage;

      switch (type) {
        case "create": {
          const { problem, category } = payload as any;
          if (!problem || !category)
            return client.send(
              JSON.stringify({
                requestId,
                ok: false,
                error: "problem and category required",
              }),
            );
          if (currentRun)
            return client.send(
              JSON.stringify({
                requestId,
                ok: false,
                error:
                  "Cannot do multiple runs, delete/submit current run first",
              }),
            );

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

          currentRun = runId;
          return client.send(
            JSON.stringify({
              requestId,
              ok: true,
              type: "create",
              data: { runId },
            }),
          );
        }

        case "move": {
          if (!currentRun)
            return client.send(
              JSON.stringify({ requestId, ok: false, error: "No current run" }),
            );

          const { moves, file, language } = payload as any;
          if (!moves || file === undefined || language === undefined)
            return client.send(
              JSON.stringify({
                requestId,
                ok: false,
                error: "moves, file, and language required",
              }),
            );

          const liveRun = await Core.getLiveRun(currentRun);
          if (!liveRun)
            return client.send(
              JSON.stringify({ requestId, ok: false, error: "Run not live" }),
            );

          const run = await Core.addLiveRunEvent(
            liveRun.id,
            file,
            language,
            moves,
          );
          return client.send(
            JSON.stringify({ requestId, ok: true, type: "move", data: run }),
          );
        }

        case "submit": {
          if (!currentRun)
            return client.send(
              JSON.stringify({ requestId, ok: false, error: "No current run" }),
            );

          const liveRun = await Core.getLiveRun(currentRun);
          if (!liveRun)
            return client.send(
              JSON.stringify({ requestId, ok: false, error: "Run not live" }),
            );

          const run = await Core.submitRun(liveRun, session[0].id);
          currentRun = undefined;
          return client.send(
            JSON.stringify({ requestId, ok: true, type: "submit", data: run }),
          );
        }

        case "delete": {
          if (!currentRun)
            return client.send(
              JSON.stringify({ requestId, ok: false, error: "No current run" }),
            );

          await cleanupRun();
          return client.send(
            JSON.stringify({
              requestId,
              ok: true,
              type: "delete",
              data: { id: currentRun },
            }),
          );
        }

        case "getText": {
          if (!currentRun)
            return client.send(
              JSON.stringify({ requestId, ok: false, error: "No current run" }),
            );

          const data = await redis.get(`liveRunText:${currentRun}`);
          return client.send(JSON.stringify({ requestId, ok: true, data }));
        }

        default:
          return client.send(
            JSON.stringify({
              requestId,
              ok: false,
              error: "Unknown message type",
            }),
          );
      }
    } catch (err) {
      console.error(err);
      if (requestId)
        client.send(
          JSON.stringify({ requestId, ok: false, error: "Malformed message" }),
        );
      closeClient("Malformed message");
    }
  });

  client.on("close", async () => {
    clearInterval(heartbeat);
    await cleanupRun();
  });

  client.on("error", (err) => {
    console.error("WebSocket error:", err);
    clearInterval(heartbeat);
    closeClient("WebSocket error");
  });
}

export function GET(req: NextRequest) {
  const headers = new Headers();
  headers.set("Connection", "Upgrade");
  headers.set("Upgrade", "websocket");
  return new Response("Upgrade Required", { status: 426, headers });
}
