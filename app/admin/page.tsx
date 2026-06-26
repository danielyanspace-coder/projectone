"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";

type App = {
  ref: string;
  project: string;
  tagline: string;
  description: string;
  category: string;
  city: string;
  founders: string;
  email: string;
  telegram?: string;
  website?: string;
  stage: string;
  ai: string;
  createdAt: string;
  status: "new" | "review" | "recognized" | "declined";
  residentId?: string;
};

const statusMeta: Record<App["status"], { label: string; cls: string }> = {
  new: { label: "Новая", cls: "border-white/20 text-white/70" },
  review: { label: "На рассмотрении", cls: "border-amber-400/40 text-amber-300" },
  recognized: { label: "Признан", cls: "border-brand/50 text-brand" },
  declined: { label: "Отклонён", cls: "border-red-400/40 text-red-300" },
};

export default function Admin() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [apps, setApps] = useState<App[]>([]);
  const [residents, setResidents] = useState(0);
  const [err, setErr] = useState("");
  const [filter, setFilter] = useState<"all" | App["status"]>("all");

  const load = useCallback(
    async (t: string) => {
      const r = await fetch(`/api/admin?token=${encodeURIComponent(t)}`);
      if (r.status === 401) {
        setErr("Неверный токен");
        setAuthed(false);
        return;
      }
      const j = await r.json();
      setApps(j.applications);
      setResidents(j.residents);
      setAuthed(true);
      setErr("");
    },
    []
  );

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("nova_admin") : null;
    if (saved) {
      setToken(saved);
      load(saved);
    }
  }, [load]);

  async function setStatus(ref: string, status: App["status"]) {
    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ ref, status }),
    });
    load(token);
  }

  if (!authed) {
    return (
      <section className="container-x flex min-h-[80vh] items-center justify-center pt-20">
        <div className="bento bento-pad w-full max-w-sm p-8">
          <h1 className="font-display text-2xl font-semibold text-white">Админ-панель Nova</h1>
          <p className="mt-2 text-sm text-white/45">Введите токен доступа для управления заявками.</p>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ADMIN_TOKEN"
            className="field mt-5"
            type="password"
          />
          {err && <p className="mt-2 text-sm text-red-300">{err}</p>}
          <button
            onClick={() => {
              localStorage.setItem("nova_admin", token);
              load(token);
            }}
            className="btn-primary mt-4 w-full"
          >
            Войти
          </button>
          <p className="mt-4 font-mono text-[11px] text-white/30">
            demo-токен: nova-admin (замените через ADMIN_TOKEN)
          </p>
        </div>
      </section>
    );
  }

  const counts = {
    all: apps.length,
    new: apps.filter((a) => a.status === "new").length,
    review: apps.filter((a) => a.status === "review").length,
    recognized: apps.filter((a) => a.status === "recognized").length,
    declined: apps.filter((a) => a.status === "declined").length,
  };
  const shown = filter === "all" ? apps : apps.filter((a) => a.status === filter);

  return (
    <section className="container-x pt-28 pb-16 sm:pt-32">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white">Заявки</h1>
          <p className="mt-1 text-sm text-white/45">
            {apps.length} заявок · {residents} резидентов в реестре
          </p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("nova_admin");
            setAuthed(false);
          }}
          className="btn-ghost"
        >
          Выйти
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {(["all", "new", "review", "recognized", "declined"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-xs transition ${
              filter === f ? "border-brand bg-brand/15 text-brand" : "border-hair text-white/55 hover:text-white"
            }`}
          >
            {f === "all" ? "Все" : statusMeta[f].label} · {counts[f]}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="bento mt-8 p-12 text-center text-white/45">Заявок пока нет.</div>
      ) : (
        <div className="mt-8 grid gap-4">
          {shown.map((a) => (
            <div key={a.ref} className="bento bento-pad">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl font-semibold text-white">{a.project}</h3>
                    <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${statusMeta[a.status].cls}`}>
                      {statusMeta[a.status].label}
                    </span>
                    {a.residentId && (
                      <Link href={`/rezident/${a.residentId}`} className="font-mono text-[11px] text-brand hover:underline">
                        {a.residentId} ↗
                      </Link>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-white/55">{a.tagline}</p>
                </div>
                <span className="font-mono text-[11px] text-white/30">{a.ref}</span>
              </div>

              <div className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <Field k="Категория" v={a.category} />
                <Field k="Город" v={a.city} />
                <Field k="Стадия" v={a.stage} />
                <Field k="Основатели" v={a.founders} />
                <Field k="Email" v={a.email} />
                <Field k="Telegram" v={a.telegram || "—"} />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/55">{a.description}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/40">
                <span className="text-white/30">ИИ/технология: </span>
                {a.ai}
              </p>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-hair pt-4">
                <button onClick={() => setStatus(a.ref, "review")} className="btn-ghost text-xs">
                  На рассмотрение
                </button>
                <button
                  onClick={() => setStatus(a.ref, "recognized")}
                  className="btn-primary text-xs"
                  disabled={a.status === "recognized"}
                >
                  <Icon name="check" className="h-3.5 w-3.5" /> Признать
                </button>
                <button
                  onClick={() => setStatus(a.ref, "declined")}
                  className="btn text-xs border border-red-400/30 text-red-300 hover:bg-red-500/10"
                >
                  Отклонить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-white/30">{k}:</span>
      <span className="truncate text-white/70">{v}</span>
    </div>
  );
}
