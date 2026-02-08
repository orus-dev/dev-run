import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import * as Core from "@/modules/live-run/core";
import { getSession } from "@/modules/account/core";
import { randomUUID } from "crypto";

export async function PUT(req: NextRequest) {
  const { problem, category } = await req.json();

  if (!problem || !category)
    return NextResponse.json(
      { error: "body requires problem and category" },
      { status: 400 },
    );

  const supabase = await createClient();

  const session = await getSession(supabase);

  if (!session)
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });

  const runId = randomUUID();

  await Core.addLiveRun({
    problem,
    category,
    id: runId,
    username: session[1].username,
    views: 0,
    start: new Date().getTime(),
    runsCount: 0,
  });

  return NextResponse.json({ ok: true, runId });
}

export async function POST(req: NextRequest) {
  const { runId } = await req.json();

  if (!runId)
    return NextResponse.json({ error: "body requires runId" }, { status: 400 });

  const supabase = await createClient();

  const session = await getSession(supabase);

  if (!session)
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });

  const liveRun = await Core.getLiveRun(runId);

  if (!liveRun)
    return NextResponse.json(
      { error: "Run is not live or does not exist" },
      { status: 401 },
    );

  const run = await Core.submitRun(supabase, liveRun, session[0].id);

  return NextResponse.json({ ok: true, run });
}
