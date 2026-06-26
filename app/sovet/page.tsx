import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { council } from "@/lib/content";

export const metadata: Metadata = { title: "Экспертный совет" };

const how = [
  { title: "Чек-лист", body: "Каждую заявку оценивают по единым критериям: технология, продукт, команда, добросовестность." },
  { title: "Голосование", body: "Решение принимается коллегиально. Признание — это вердикт большинства совета, а не одного человека." },
  { title: "Без конфликта интересов", body: "Эксперт не голосует по проекту, с которым связан. Так мы держим планку честной." },
];

export default function Council() {
  return (
    <>
      <PageHero
        eyebrow="Кто выносит признание"
        title={<>Экспертный совет Nova</>}
        sub="Девять практиков: основатели проектов-резидентов, инженеры, маркетологи и новаторы Nova. Именно они решают, кому верит рынок."
      />

      <section className="container-x py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {council.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 60}>
              <div className="bento bento-pad bento-hover h-full">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-700 font-display text-lg font-semibold text-white">
                    {m.name[0]}
                  </div>
                  <span className="pill">{m.tag}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{m.name}</h3>
                <p className="mt-1 text-sm text-white/45">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-16">
        <SectionHeading eyebrow="Как принимается решение" title="Признание — это процесс, а не симпатия" />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {how.map((h, i) => (
            <Reveal key={h.title} delay={(i % 3) * 70}>
              <div className="bento bento-pad bento-hover h-full">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-hair bg-white/[0.03] text-brand">
                  <Icon name="shield" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{h.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
