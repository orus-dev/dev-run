import { WebSocketServer, WebSocket } from "ws";
import Redis from "ioredis";
import { NextRequest, NextResponse } from "next/server";
import { LiveRunEvent } from "@/modules/live-run/types";

export function GET(req: NextRequest) {
  const headers = new Headers();
  headers.set("Connection", "Upgrade");
  headers.set("Upgrade", "websocket");
  return new Response("Upgrade Required", { status: 426, headers });
}

export function UPGRADE(client: WebSocket, server: WebSocketServer) {
  const subscriber = new Redis();
  let runId: string;

  client.once("message", (message) => {
    runId = message.toString();
    let file: string | null;

    const sendText = async () => {
      const text = await subscriber.get(`liveRunText:${runId}`);
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ file, moves: [], text }));
      }
    };

    sendText();

    client.on("message", sendText);

    subscriber.subscribe(`liveRunMoves:${runId}`, (err, count) => {
      if (err) {
        console.error("Failed to subscribe", err);
        client.close(1011, "Redis subscription failed");
      }
    });

    subscriber.on("message", (channel, message) => {
      const data: LiveRunEvent = JSON.parse(message);
      file = data.file;
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ moves: data.moves, file, text: null }));
      }
    });
  });

  client.once("close", async () => {
    if (runId) await subscriber.unsubscribe(`liveRun:${runId}`);
    subscriber.quit();
  });

  client.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
}
