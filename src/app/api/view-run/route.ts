import { WebSocketServer, WebSocket } from "ws";
import Redis from "ioredis";
import { NextRequest, NextResponse } from "next/server";
import { LiveRunEvent } from "@/modules/live-run/types";
import { getLiveRun, updateLiveRunViews } from "@/modules/live-run/core";

export function GET(req: NextRequest) {
  const headers = new Headers();
  headers.set("Connection", "Upgrade");
  headers.set("Upgrade", "websocket");
  return new Response("Upgrade Required", { status: 426, headers });
}

export function UPGRADE(client: WebSocket, server: WebSocketServer) {
  const subscriber = new Redis();
  let runId: string;

  client.once("message", async (message) => {
    runId = message.toString();

    await updateLiveRunViews(runId, 1);

    let lastEvent: LiveRunEvent | null = null;

    const sendText = async () => {
      const text = await subscriber.get(`liveRunText:${runId}`);

      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            file: lastEvent?.file,
            language: lastEvent?.language,
            moves: [],
            text,
          }),
        );
      }
    };

    sendText();

    client.on("message", sendText);

    subscriber.subscribe(`liveRunEvent:${runId}`, (err, count) => {
      if (err) {
        console.error("Failed to subscribe", err);
        client.close(1011, "Redis subscription failed");
      }
    });

    subscriber.on("message", (channel, message) => {
      const data: LiveRunEvent = JSON.parse(message);

      lastEvent = data;
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ ...data, text: null }));
      }
    });
  });

  client.once("close", async () => {
    if (runId) await subscriber.unsubscribe(`liveRun:${runId}`);
    subscriber.quit();
    await updateLiveRunViews(runId, -1);
  });

  client.on("error", (err) => {
    console.error("WebSocket error:", err);
  });
}
