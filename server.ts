import { createServer, IncomingMessage } from "http";
import next from "next";
import { WebSocketServer, WebSocket } from "ws";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * One run = many websocket clients
 */
type LiveRun = {
  clients: Set<WebSocket>;
};

const runs: Record<string, LiveRun> = {};

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const wss = new WebSocketServer({ noServer: true });

  // WebSocket connections
  wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    ws.on("message", (msg: Buffer) => {
      const runId = msg.toString();

      if (!runs[runId]) {
        runs[runId] = { clients: new Set() };
      }

      runs[runId].clients.add(ws);

      ws.once("close", () => {
        runs[runId]?.clients.delete(ws);
      });
    });
  });

  // Handle POST requests
  server.on("request", (req, res) => {
    if (req.method === "POST" && req.url === "/api/run/move") {
      let body = "";

      req.on("data", (chunk: Buffer) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const move: {
            runId: string;
            moves: unknown;
          } = JSON.parse(body);

          runs[move.runId]?.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(move.moves));
            }
          });

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ status: "ok" }));
        } catch (err) {
          res.writeHead(400);
          res.end("Invalid JSON");
        }
      });
    }
  });

  // Upgrade HTTP → WebSocket
  server.on("upgrade", (req, socket, head) => {
    if (req.url === "/api/view-run") {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
      });
    }
  });

  server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
