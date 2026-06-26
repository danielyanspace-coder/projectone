// Small decorative + presentational building blocks shared across pages.
import Link from "next/link";
import { Icon } from "./Icon";
import { GlyphIcon } from "./GlyphIcon";
import { DitherRing } from "./motion/DitherRing";
import { CountUp } from "./motion/CountUp";

export function StatCard({
  value,
  label,
  sub,
  countTo,
  suffix,
  highlight = false,
  withRing = false,
}: {
  value: string;
  label: string;
  sub?: string;
  countTo?: number;
  suffix?: string;
  highlight?: boolean;
  withRing?: boolean;
}) {
  return (
    <div className={`bento spot bento-pad bento-hover flex h-full flex-col justify-between ${highlight ? "ring-1 ring-brand/40" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className={`font-display text-4xl font-semibold tracking-tight sm:text-5xl ${highlight ? "text-brand" : "text-white"}`}>
            {countTo !== undefined ? <CountUp to={countTo} suffix={suffix} /> : value}
          </div>
          <div className="mt-2 max-w-[16ch] text-sm text-white/80">{label}</div>
        </div>
        {withRing && <DitherRing className="w-20 shrink-0 sm:w-24" />}
      </div>
      {sub && <p className="mt-6 font-mono text-xs leading-relaxed text-white/40">{sub}</p>}
    </div>
  );
}

export function LinkCard({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <Link href={href} className="bento spot bento-pad bento-hover group flex h-full flex-col justify-between">
      <div className="flex items-start justify-between">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-white/90 sm:text-3xl">{title}</h3>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-hair text-white/60 transition-all group-hover:border-brand group-hover:bg-brand group-hover:text-white">
          <Icon name="arrowUpRight" className="h-4 w-4" />
        </span>
      </div>
      <div>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-white/45">{body}</p>
        <span className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.16em] text-brand">{cta}</span>
      </div>
    </Link>
  );
}

export function PerkCard({
  title,
  body,
  icon,
  big = false,
}: {
  title: string;
  body: string;
  icon: string;
  big?: boolean;
}) {
  return (
    <div className={`bento spot bento-pad bento-hover flex h-full flex-col ${big ? "sm:col-span-2" : ""}`}>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-hair bg-gradient-to-br from-white/[0.06] to-transparent">
        <GlyphIcon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/45">{body}</p>
    </div>
  );
}
