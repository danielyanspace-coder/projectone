import { Icon } from "../Icon";

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden border-y border-hair py-6">
      <div className="marquee-track">
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-12 pr-12 font-display text-lg font-medium text-white/35 sm:text-xl">
            {it}
            <Icon name="spark" className="h-3 w-3 text-brand/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
