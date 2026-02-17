import "server-only";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient as createSimpleClient } from "@supabase/supabase-js";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set(name, "", options);
        },
      },
    },
  );
}

export async function createClientCookie(cookies: Map<string, string>) {
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies.get(name) || null;
        },
        set(name: string, value: string) {
          cookies.set(name, value);
        },
        remove(name: string, options: CookieOptions) {
          cookies.delete(name);
        },
      },
    },
  );
}

export const supabaseApiClient = createSimpleClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);
