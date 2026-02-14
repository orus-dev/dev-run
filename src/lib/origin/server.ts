import "server-only";

import { headers } from "next/headers";

export async function getOrigin(): Promise<{
  protocol: string;
  host: string;
  wsProtocol: string;
  httpOrigin: string;
  wsOrigin: string;
}> {
  const h = await headers();
  const host = process.env.ORIGIN || h.get(":authority") || "localhost:3000";
  const protocol =
    process.env.ORIGIN_PROTO ||
    h.get("x-forwarded-proto") ||
    h.get(":scheme") ||
    "https";

  const wsProtocol = protocol === "https" ? "wss" : "ws";

  return {
    protocol,
    host,
    wsProtocol,
    httpOrigin: `${protocol}://${host}`,
    wsOrigin: `${wsProtocol}://${host}`,
  };
}
