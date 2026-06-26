import { NextRequest, NextResponse } from "next/server";
import { getApplications, setApplicationStatus, getResidents } from "@/lib/store";

export const dynamic = "force-dynamic";

// Demo token. В продакшене задайте ADMIN_TOKEN в переменных окружения.
const TOKEN = process.env.ADMIN_TOKEN || "nova-admin";

function authed(req: NextRequest) {
  const t = req.headers.get("x-admin-token") || req.nextUrl.searchParams.get("token");
  return t === TOKEN;
}

export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  return NextResponse.json({
    ok: true,
    applications: getApplications(),
    residents: getResidents().length,
  });
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const { ref, status } = await req.json();
  const allowed = ["new", "review", "recognized", "declined"];
  if (!ref || !allowed.includes(status)) {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }
  const app = setApplicationStatus(ref, status);
  if (!app) return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  return NextResponse.json({ ok: true, application: app });
}
