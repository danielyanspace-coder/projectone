import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { posts } from "@/lib/content";

export const metadata: Metadata = { title: "Блог" };

function fmt(d: string) {
  return new Date(d).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default function Blog() {
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero
        eyebrow="Журнал Nova"
        title={<>Истории, процессы, резиденты</>}
        sub="Как устроено признание, кого мы отбираем и почему технологиям нужно доверие."
      />
      <section className="container-x py-12">
        <Reveal>
          <Link
            href={`/blog/${lead.slug}`}
            className="bento bento-hover group relative grid overflow-hidden lg:grid-cols-2"
          >
            <div className="relative min-h-[220px] bg-[radial-gradient(80%_120%_at_30%_0%,rgba(41,141,255,0.35),transparent_60%)]">
              <div className="absolute inset-0 grain" />
              <span className="absolute left-6 top-6 pill">{lead.tag}</span>
            </div>
            <div className="bento-pad flex flex-col justify-center p-8 sm:p-10">
              <span className="mono-label">{fmt(lead.date)}</span>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {lead.title}
              </h2>
              <p className="mt-3 text-white/55">{lead.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-brand">
                Читать <Icon name="arrow" className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </Reveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 80}>
              <Link href={`/blog/${p.slug}`} className="bento bento-pad bento-hover group flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="pill">{p.tag}</span>
                  <span className="font-mono text-[11px] text-white/35">{fmt(p.date)}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/45">{p.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-brand">
                  Читать <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
