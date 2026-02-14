// app/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getOrigin } from "@/lib/origin/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const { httpOrigin } = await getOrigin();

  if (!code) {
    return NextResponse.json({ error: "code param required" }, { status: 400 });
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(`${httpOrigin}/problems`);
}
