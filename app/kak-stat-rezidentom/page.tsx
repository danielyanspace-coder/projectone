import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { steps, criteria, faq } from "@/lib/content";

export const metadata: Metadata = { title: "Как стать резидентом" };

export default function HowTo() {
  return (
    <>
      <PageHero
        eyebrow="Путь резидента"
        title={<>От заявки до признания</>}
        sub="Прозрачный процесс без бюрократии. Решение выносит Экспертный совет — и только после признания вы становитесь резидентом."
      />

      {/* steps timeline */}
      <section className="container-x py-16">
        <div className="grid gap-4 lg:grid-cols-2">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={(i % 2) * 80} className={i === 4 ? "lg:col-span-2" : ""}>
              <div className="bento bento-pad bento-hover flex h-full items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-hair bg-white/[0.03] font-display text-lg font-semibold text-brand">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/50">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* criteria */}
      <section className="container-x py-16">
        <SectionHeading
          eyebrow="Критерии"
          title="Кого признаёт совет"
          sub="Простой и честный чек-лист. Соответствуете — подавайте заявку."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {criteria.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 60}>
              <div className="bento bento-pad bento-hover h-full">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <Icon name="check" className="h-5 w-5" stroke={2.2} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* faq */}
      <section className="container-x py-16">
        <SectionHeading eyebrow="Вопросы" title="Частые вопросы" />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {faq.map((f, i) => (
            <Reveal key={f.q} delay={(i % 2) * 60}>
              <details className="bento group bento-pad open:bg-ink-800">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-base font-medium text-white">{f.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hair text-white/60 transition-transform group-open:rotate-45">
                    <Icon name="spark" className="h-3.5 w-3.5" />
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-white/55">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-16">
        <Reveal>
          <div className="bento flex flex-col items-center gap-5 p-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Готовы заслужить признание?
              </h2>
              <p className="mt-2 text-white/50">Заявка займёт 10 минут.</p>
            </div>
            <Link href="/zayavka" className="btn-primary shrink-0">
              Подать заявку <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
