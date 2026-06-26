import Link from "next/link";
import type { Resident } from "@/lib/store";
import { Icon } from "./Icon";

export function ResidentCard({ r }: { r: Resident }) {
  return (
    <Link href={`/rezident/${r.id}`} className="bento spot bento-pad bento-hover group flex h-full flex-col">
      <div className="flex items-center justify-between">
        <span className="pill">{r.category}</span>
        <span className="font-mono text-[11px] text-white/35">{r.id}</span>
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-white">{r.project}</h3>
      <p className="mt-1.5 text-sm text-white/55">{r.tagline}</p>
      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-white/40">{r.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-hair pt-4">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
          <Icon name="badge" className="h-3.5 w-3.5" /> Резидент Nova
        </span>
        <span className="text-white/40 transition-transform group-hover:translate-x-0.5">
          <Icon name="arrow" className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
