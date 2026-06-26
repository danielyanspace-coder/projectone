import { NextRequest, NextResponse } from "next/server";
import { addApplication } from "@/lib/store";

export const dynamic = "force-dynamic";

const required = ["project", "tagline", "description", "category", "city", "founders", "email", "stage", "ai"];

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  for (const f of required) {
    if (!body[f] || !String(body[f]).trim()) {
      return NextResponse.json({ ok: false, error: `Заполните поле: ${f}` }, { status: 400 });
    }
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) {
    return NextResponse.json({ ok: false, error: "Укажите корректный email" }, { status: 400 });
  }

  const app = addApplication({
    project: body.project.trim(),
    tagline: body.tagline.trim(),
    description: body.description.trim(),
    category: body.category.trim(),
    city: body.city.trim(),
    website: body.website?.trim() || undefined,
    founders: body.founders.trim(),
    email: body.email.trim(),
    telegram: body.telegram?.trim() || undefined,
    stage: body.stage.trim(),
    ai: body.ai.trim(),
  });

  return NextResponse.json({ ok: true, ref: app.ref });
}
