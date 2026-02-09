import { WebSocketServer, WebSocket } from "ws";

export function UPGRADE(client: WebSocket, server: WebSocketServer) {
  console.log("A client connected");

  client.on("message", (message) => {
    console.log("Received message:", message);
    client.send(message);
  });

  client.once("close", () => {
    console.log("A client disconnected");
  });
}
