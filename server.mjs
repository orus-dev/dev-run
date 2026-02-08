import { createServer } from 'http';
import next from 'next';
import { WebSocketServer } from 'ws';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });
  
  const clients = {};

  const wss = new WebSocketServer({ noServer: true });

  // Handle WebSocket connections
  wss.on('connection', (ws, req) => {
    ws.on('message', (msg) => {
      const runId = msg.toString();
      if (!clients[runId]) clients[runId] = []
      clients[runId].push(ws);
    });
  });

  // Handle POST requests
  server.on('request', async (req, res) => {
    console.log(req.method, req.url)
    if (req.method === 'POST' && req.url === '/api/run/move') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const move = JSON.parse(body);

        clients[move.runId]?.forEach(client => {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(move.moves));
          }
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
      });
    }
  });

  // Upgrade HTTP connections to WebSocket when needed
  server.on('upgrade', (req, socket, head) => {
    if (req.url === '/api/view-run') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    }
  });

  server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
