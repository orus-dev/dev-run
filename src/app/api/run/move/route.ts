import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import * as Core from "@/modules/live-run/core";
import { getSession } from "@/modules/account/core";

export async function POST(req: NextRequest) {
  const { runId, moves, file } = await req.json();

  if (!runId || !moves || file === undefined)
    return NextResponse.json(
      { error: "body requires runId and moves and file" },
      { status: 400 },
    );

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

  console.log(moves, file);

  const run = await Core.addLiveRunMoves(liveRun.id, file, moves);

  return NextResponse.json({ ok: true, run });
}
