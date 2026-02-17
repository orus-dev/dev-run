// ws/liveRun.ts
import { WebSocketServer, WebSocket } from "ws";
import { NextRequest } from "next/server";
import { LiveRunEvent } from "@/modules/live-run/types";
import { updateLiveRunViews } from "@/modules/live-run/core";
import { redis, redisSubscriber } from "@/lib/redis";

// Map of runId → Set of WebSockets
const runSubscribers: Map<string, Set<WebSocket>> = new Map();

// Handle incoming Pub/Sub messages
redisSubscriber.on("message", (channel, message) => {
  const runId = channel.split(":")[1];
  const sockets = runSubscribers.get(runId);
  if (!sockets) return;

  const data: LiveRunEvent = JSON.parse(message);

  sockets.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ ...data, text: null }));
    }
  });
});

export async function UPGRADE(client: WebSocket, server: WebSocketServer) {
  let runId: string;

  // Receive runId from client
  client.once("message", async (message) => {
    runId = message.toString();

    // Track view count
    await updateLiveRunViews(runId, 1);

    // Send initial text
    const text = await redis.get(`liveRunText:${runId}`);
    client.send(
      JSON.stringify({ file: null, language: null, moves: [], text }),
    );

    // Add WebSocket to subscribers
    if (!runSubscribers.has(runId)) {
      runSubscribers.set(runId, new Set());
      await redisSubscriber.subscribe(`liveRunEvent:${runId}`);
    }
    runSubscribers.get(runId)!.add(client);
  });

  // Handle client disconnect
  client.once("close", async () => {
    const set = runSubscribers.get(runId);
    if (set) {
      set.delete(client);
      if (set.size === 0) {
        await redisSubscriber.unsubscribe(`liveRunEvent:${runId}`);
        runSubscribers.delete(runId);
      }
    }

    await updateLiveRunViews(runId, -1);
  });

  client.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
}

export function GET(req: NextRequest) {
  const headers = new Headers();
  headers.set("Connection", "Upgrade");
  headers.set("Upgrade", "websocket");
  return new Response("Upgrade Required", { status: 426, headers });
}
