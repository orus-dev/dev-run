"use server";

import { headers } from "next/headers";

export async function getOrigin(): Promise<{ protocol: string; host: string }> {
  const h = await headers();
  const host = h.get("host") || "localhost:3000";
  const protocol = h.get("x-forwarded-proto") ?? "https";

  return { protocol, host };
}
