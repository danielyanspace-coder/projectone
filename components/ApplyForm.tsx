"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./Icon";

const fields = [
  { name: "project", label: "Название проекта", placeholder: "Например, Helix AI", type: "text", col: 1 },
  { name: "tagline", label: "Одной строкой", placeholder: "Голосовой ассистент для клиник", type: "text", col: 1 },
  { name: "category", label: "Категория", placeholder: "HealthTech · ИИ", type: "text", col: 1 },
  { name: "city", label: "Город", placeholder: "Москва", type: "text", col: 1 },
  { name: "founders", label: "Основатели", placeholder: "Имена основателей", type: "text", col: 1 },
  { name: "website", label: "Сайт / демо (необязательно)", placeholder: "https://…", type: "text", col: 1 },
  { name: "email", label: "Email для связи", placeholder: "you@startup.com", type: "email", col: 1 },
  { name: "telegram", label: "Telegram (необязательно)", placeholder: "@username", type: "text", col: 1 },
];

const stages = ["Идея с прототипом", "MVP", "Первые пользователи", "Растущий продукт"];

export function ApplyForm() {
  const [data, setData] = useState<Record<string, string>>({ stage: stages[1] });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [ref, setRef] = useState("");
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const r = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await r.json();
      if (j.ok) {
        setRef(j.ref);
        setStatus("done");
      } else {
        setError(j.error || "Что-то пошло не так");
        setStatus("error");
      }
    } catch {
      setError("Сеть недоступна. Попробуйте позже.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="bento relative overflow-hidden p-8 text-center sm:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_50%_-10%,rgba(41,141,255,0.22),transparent_60%)]" />
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Icon name="check" className="h-7 w-7" stroke={2.2} />
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white">Заявка принята</h2>
        <p className="mx-auto mt-3 max-w-md text-white/55">
          Экспертный совет рассмотрит проект в течение 1–5 дней. Решение придёт на указанный email.
          Членский взнос — только после признания.
        </p>
        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-xl border border-hair bg-white/[0.02] px-4 py-3">
          <span className="mono-label">Номер заявки</span>
          <span className="font-mono text-white">{ref}</span>
        </div>
        <div className="mt-8">
          <Link href="/" className="btn-ghost">
            На главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bento bento-pad p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="field-label">{f.label}</label>
            <input
              type={f.type}
              value={data[f.name] || ""}
              onChange={(e) => set(f.name, e.target.value)}
              placeholder={f.placeholder}
              className="field"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="field-label">Стадия проекта</label>
          <div className="flex flex-wrap gap-2">
            {stages.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => set("stage", s)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  data.stage === s
                    ? "border-brand bg-brand/15 text-brand"
                    : "border-hair text-white/55 hover:border-hairlit hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="field-label">Роль ИИ / технологии в проекте</label>
          <textarea
            rows={2}
            value={data.ai || ""}
            onChange={(e) => set("ai", e.target.value)}
            placeholder="Какую технологию вы используете и почему она ключевая?"
            className="field resize-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="field-label">Описание проекта</label>
          <textarea
            rows={4}
            value={data.description || ""}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Что вы делаете, для кого и какую проблему решаете?"
            className="field resize-none"
          />
        </div>
      </div>

      {status === "error" && (
        <div className="mt-5 rounded-xl border border-red-500/25 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs leading-relaxed text-white/40">
          Отправляя заявку, вы соглашаетесь с{" "}
          <Link href="/oferta" className="text-white/60 underline">
            офертой
          </Link>{" "}
          и{" "}
          <Link href="/politika-konfidencialnosti" className="text-white/60 underline">
            политикой конфиденциальности
          </Link>
          .
        </p>
        <button type="submit" disabled={status === "sending"} className="btn-primary w-full shrink-0 disabled:opacity-60 sm:w-auto">
          {status === "sending" ? "Отправляем…" : "Отправить на рассмотрение"}
          {status !== "sending" && <Icon name="arrow" className="h-4 w-4" />}
        </button>
      </div>
    </form>
  );
}
