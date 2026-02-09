import { WebSocketServer, WebSocket } from "ws";
import Redis from "ioredis";
import { LiveRunMove } from "@/modules/live-run/types";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const headers = new Headers();
  headers.set("Connection", "Upgrade");
  headers.set("Upgrade", "websocket");
  return new Response("Upgrade Required", { status: 426, headers });
}

export function UPGRADE(client: WebSocket, server: WebSocketServer) {
  console.log("A client connected");

  const subscriber = new Redis();
  let runId: string;

  client.once("message", (message) => {
    runId = message.toString();

    subscriber.subscribe(`liveRunMoves:${runId}`, (err, count) => {
      if (err) {
        console.error("Failed to subscribe", err);
        client.close(1011, "Redis subscription failed");
      } else {
        console.log(`Subscribed to ${count} channels`);
      }
    });

    subscriber.on("message", (channel, message) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  client.once("close", async () => {
    if (runId) await subscriber.unsubscribe(`liveRun:${runId}`);
    subscriber.quit();
    console.log("Client disconnected, Redis unsubscribed");
  });

  client.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
}
