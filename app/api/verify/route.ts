import { NextRequest, NextResponse } from "next/server";
import { getResident } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")?.trim() || "";
  if (!id) return NextResponse.json({ ok: false, error: "Укажите ID" }, { status: 400 });

  const r = getResident(id);
  if (!r) {
    return NextResponse.json({ ok: false, found: false });
  }
  return NextResponse.json({
    ok: true,
    found: true,
    resident: {
      id: r.id,
      project: r.project,
      tagline: r.tagline,
      category: r.category,
      recognizedAt: r.recognizedAt,
    },
  });
}
