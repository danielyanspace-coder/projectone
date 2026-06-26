"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./Icon";

type Result =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "found"; resident: { id: string; project: string; tagline: string; category: string; recognizedAt: string } }
  | { state: "notfound" };

export function VerifyForm() {
  const [id, setId] = useState("");
  const [res, setRes] = useState<Result>({ state: "idle" });

  async function check(e: React.FormEvent) {
    e.preventDefault();
    if (!id.trim()) return;
    setRes({ state: "loading" });
    try {
      const r = await fetch(`/api/verify?id=${encodeURIComponent(id.trim())}`);
      const data = await r.json();
      if (data.found) setRes({ state: "found", resident: data.resident });
      else setRes({ state: "notfound" });
    } catch {
      setRes({ state: "notfound" });
    }
  }

  return (
    <div className="bento bento-pad p-6 sm:p-8">
      <form onSubmit={check} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
            <Icon name="id" className="h-4 w-4" />
          </span>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Например, NSR-2026-0001"
            className="field pl-11 font-mono uppercase tracking-wider"
          />
        </div>
        <button type="submit" className="btn-primary shrink-0">
          Проверить <Icon name="arrow" className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-5">
        {res.state === "loading" && (
          <div className="flex items-center gap-2 text-sm text-white/45">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-brand" />
            Проверяем в реестре…
          </div>
        )}

        {res.state === "notfound" && (
          <div className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/[0.06] p-4">
            <span className="mt-0.5 text-red-400">✕</span>
            <div>
              <p className="text-sm font-medium text-white">ID не найден в реестре</p>
              <p className="mt-1 text-sm text-white/45">
                Проверьте правильность ID. Подлинный резидент всегда есть в публичном реестре Nova.
              </p>
            </div>
          </div>
        )}

        {res.state === "found" && (
          <Link
            href={`/rezident/${res.resident.id}`}
            className="group block rounded-xl border border-brand/30 bg-brand/[0.07] p-5 transition hover:bg-brand/[0.12]"
          >
            <div className="flex items-center gap-2 text-brand">
              <Icon name="check" className="h-4 w-4" stroke={2.4} />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Подлинность подтверждена</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="font-display text-xl font-semibold text-white">{res.resident.project}</div>
                <div className="mt-0.5 text-sm text-white/55">{res.resident.tagline}</div>
              </div>
              <span className="text-white/40 transition-transform group-hover:translate-x-0.5">
                <Icon name="arrow" className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-3 font-mono text-xs text-white/40">{res.resident.id} · {res.resident.category}</div>
          </Link>
        )}
      </div>
    </div>
  );
}
