import { headers } from "next/headers";
import "server-only";

export async function getOrigin(): Promise<{ protocol: string; host: string }> {
  const h = await headers();
  const host = process.env.ORIGIN || h.get(":authority") || "localhost:3000";
  const protocol = h.get("x-forwarded-proto") || h.get(":scheme") || "https";

  return { protocol, host };
}
