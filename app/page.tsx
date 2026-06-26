import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/Section";
import { StatCard, PerkCard } from "@/components/Bits";
import { ResidentCard } from "@/components/ResidentCard";
import { Icon } from "@/components/Icon";
import { AuroraBackground } from "@/components/motion/AuroraBackground";
import { ParticleField } from "@/components/motion/ParticleField";
import { DitherRing } from "@/components/motion/DitherRing";
import { Marquee } from "@/components/motion/Marquee";
import { stats, perks, steps, council, trust, marqueeItems } from "@/lib/content";
import { getResidents } from "@/lib/store";
import { site } from "@/lib/site";

export default function Home() {
  const residents = getResidents().slice(0, 3);

  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative overflow-hidden">
        <AuroraBackground variant="hero" />
        <ParticleField className="absolute inset-0 -z-[5] opacity-70" />
        <div className="absolute inset-0 -z-[4] bg-gradient-to-b from-black/50 via-transparent to-black" />
        <div className="container-x flex min-h-[94vh] flex-col items-center justify-center pt-28 pb-16 text-center">
          <Reveal>
            <Eyebrow>Институт признания технологий</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-8 font-display text-[15vw] font-semibold leading-[0.92] tracking-tight text-white text-glow sm:text-7xl md:text-8xl">
              Технологиям
              <br />
              нужно <span className="shine-text">признание</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-white/65">{site.manifesto}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/zayavka" className="btn-primary">
                Подать заявку <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/missiya" className="btn-ghost">
                Наша миссия
              </Link>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Признание нельзя купить — его можно заслужить
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── STATS BENTO ───────────────────────── */}
      <section className="container-x -mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="sm:col-span-2 lg:col-span-1">
            <StatCard {...stats[0]} highlight withRing />
          </Reveal>
          {stats.slice(1).map((s, i) => (
            <Reveal key={s.label} delay={60 * (i + 1)}>
              <StatCard {...s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────────────── MARQUEE ───────────────────────── */}
      <section className="container-x mt-20">
        <Reveal>
          <div className="mb-5 text-center">
            <span className="mono-label">Направления, которые мы признаём</span>
          </div>
          <Marquee items={marqueeItems} />
        </Reveal>
      </section>

      {/* ───────────────────────── PHILOSOPHY ───────────────────────── */}
      <section className="container-x py-24 sm:py-32">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionHeading
            eyebrow="Кто мы"
            title={<>Мы не клуб по интересам. Мы — институт, который признаёт.</>}
            sub="Nova Scout оценивает технологические проекты как судья, а не как продавец. Статус резидента — это вердикт Экспертного совета, а не строка в прайсе. Поэтому он что-то значит."
          />
          <Reveal delay={120}>
            <div className="grid gap-4">
              <div className="bento spot bento-pad">
                <div className="mono-label">Принцип</div>
                <p className="mt-3 text-lg leading-relaxed text-white/80">
                  «Сначала признание — потом членство. Вы вносите взнос только после того, как совет
                  признал проект».
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bento spot bento-pad">
                  <div className="font-display text-3xl font-semibold text-brand">12 мес.</div>
                  <p className="mt-2 text-sm text-white/45">срок резидентства</p>
                </div>
                <div className="bento spot bento-pad">
                  <div className="font-display text-3xl font-semibold text-white">{site.fee}</div>
                  <p className="mt-2 text-sm text-white/45">годовой членский взнос</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── ABSTRACT VISUAL BAND ───────────────────────── */}
      <section className="container-x py-8">
        <Reveal>
          <div className="bento relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden p-10 text-center sm:p-16">
            <AuroraBackground variant="band" />
            <div className="absolute inset-0 -z-[5] opacity-50">
              <ParticleField className="h-full w-full" />
            </div>
            <DitherRing className="pointer-events-none absolute left-1/2 top-1/2 w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]" />
            <span className="pill">Признание, у которого есть вес</span>
            <h2 className="mt-6 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Один статус, которому <span className="gradient-text">верит рынок</span>
            </h2>
            <div className="mt-10 grid w-full gap-4 sm:grid-cols-3">
              {trust.map((t) => (
                <div key={t.who} className="rounded-2xl border border-hair bg-black/40 p-5 text-left backdrop-blur-sm">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand">{t.who}</div>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────────────────────── PERKS BENTO ───────────────────────── */}
      <section className="container-x py-16">
        <SectionHeading
          eyebrow="Что даёт резидентство"
          title="Преимущества, которые работают на вас"
          sub="Каждое — следствие принадлежности к Nova, а не купленная услуга."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 70} className={p.big ? "sm:col-span-2" : ""}>
              <PerkCard {...p} />
            </Reveal>
          ))}
          <Reveal delay={140}>
            <Link
              href="/rezidentstvo"
              className="bento spot bento-pad bento-hover group flex h-full flex-col justify-between bg-brand/[0.07]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
                <Icon name="arrowUpRight" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="mt-5 text-lg font-semibold text-white">Все преимущества</h3>
                <p className="mt-2 text-sm text-white/55">Полный состав годового резидентства Nova.</p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── PROCESS ───────────────────────── */}
      <section className="container-x py-24 sm:py-32">
        <SectionHeading
          eyebrow="Путь резидента"
          title="Пять шагов от заявки до признания"
          sub="Никакой бюрократии. Решает Экспертный совет — коллегиально и по существу."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={(i % 5) * 60}>
              <div className="bento spot bento-pad bento-hover flex h-full flex-col">
                <span className="font-mono text-sm text-brand">{s.n}</span>
                <h3 className="mt-4 text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="mt-6 flex justify-center">
            <Link href="/kak-stat-rezidentom" className="btn-ghost">
              Подробно о признании <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ───────────────────────── COUNCIL ───────────────────────── */}
      <section className="container-x py-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Экспертный совет"
            title="Признание выносят практики"
            sub="Заявки оценивают действующие фаундеры, инженеры, маркетологи и новаторы Nova. Решение — коллегиальное."
          />
          <Reveal delay={120}>
            <div className="grid gap-3 sm:grid-cols-2">
              {council.slice(0, 4).map((m) => (
                <div key={m.name} className="bento spot bento-pad">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-700 font-display text-sm font-semibold text-white">
                    {m.name[0]}
                  </div>
                  <div className="mt-4 text-sm font-semibold text-white">{m.name}</div>
                  <div className="mt-1 text-xs text-white/45">{m.role}</div>
                </div>
              ))}
              <Link href="/sovet" className="bento spot bento-pad bento-hover group flex items-center justify-between sm:col-span-2">
                <span className="text-sm text-white/70">Весь состав совета — 9 экспертов</span>
                <Icon name="arrow" className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── REGISTRY ───────────────────────── */}
      <section className="container-x py-24 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Реестр резидентов"
            title="Признанные проекты"
            sub="Каждого можно проверить по ID. Подлинность подтверждается онлайн."
          />
          <Reveal>
            <Link href="/reestr" className="btn-ghost">
              Весь реестр <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {residents.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 70}>
              <ResidentCard r={r} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────────────── CTA ───────────────────────── */}
      <section className="container-x pb-8">
        <Reveal>
          <div className="bento relative overflow-hidden p-10 text-center sm:p-16">
            <AuroraBackground variant="band" />
            <Eyebrow>Готовы к признанию?</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Подайте заявку и получите вердикт Экспертного совета
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/55">
              Заполнение занимает 10 минут. Взнос — только после признания.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/zayavka" className="btn-primary">
                Подать заявку <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/proverka" className="btn-white">
                Проверить ID резидента
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
