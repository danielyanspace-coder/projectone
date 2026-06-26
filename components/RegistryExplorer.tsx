"use client";

import { useMemo, useState } from "react";
import type { Resident } from "@/lib/store";
import { ResidentCard } from "./ResidentCard";
import { Icon } from "./Icon";

export function RegistryExplorer({ residents }: { residents: Resident[] }) {
  const [q, setQ] = useState("");
  const categories = useMemo(() => {
    const set = new Set(residents.map((r) => r.category.split("·")[0].trim()));
    return ["Все", ...Array.from(set)];
  }, [residents]);
  const [cat, setCat] = useState("Все");

  const filtered = residents.filter((r) => {
    const matchQ =
      !q ||
      [r.project, r.tagline, r.id, r.category, r.city].join(" ").toLowerCase().includes(q.toLowerCase());
    const matchCat = cat === "Все" || r.category.startsWith(cat);
    return matchQ && matchCat;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">
            <Icon name="search" className="h-4 w-4" />
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск по проекту, ID или категории…"
            className="field pl-11"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-3.5 py-2 text-xs transition ${
                cat === c
                  ? "border-brand bg-brand/15 text-brand"
                  : "border-hair text-white/55 hover:border-hairlit hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 font-mono text-xs text-white/35">
        {filtered.length} {plural(filtered.length)}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <ResidentCard key={r.id} r={r} />
          ))}
        </div>
      ) : (
        <div className="bento mt-6 p-12 text-center text-white/45">Ничего не найдено по запросу.</div>
      )}
    </div>
  );
}

function plural(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "резидент";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "резидента";
  return "резидентов";
}
