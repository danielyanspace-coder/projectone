import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Миссия" };

const principles = [
  {
    title: "Признание выше рекламы",
    body: "Мы не продаём видимость. Мы выносим вердикт. Видимость — следствие признания, а не товар.",
  },
  {
    title: "Судья, а не продавец",
    body: "Экспертный совет оценивает проект непредвзято. Можно получить отказ — и это делает «да» ценным.",
  },
  {
    title: "Статус, который нельзя купить",
    body: "Членский взнос вносится только после признания. Деньги не покупают статус — они его подтверждают.",
  },
  {
    title: "Доверие по умолчанию",
    body: "Резидент Nova — это сигнал рынку: проект прошёл отбор практиков и его подлинность проверяема.",
  },
];

export default function Mission() {
  return (
    <>
      <PageHero
        eyebrow="Манифест"
        title={<>Хорошим технологиям не хватает не идей, а признания.</>}
        sub="Nova Scout существует, чтобы давать новаторам и то, и другое — признание и доверие."
      />

      <section className="container-x py-20">
        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="bento bento-pad flex h-full flex-col justify-center p-8 sm:p-12">
              <span className="mono-label">Манифест Nova</span>
              <p className="mt-6 font-display text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
                Каждый день рождаются сильные продукты, которые мир не замечает. Им мешает не
                отсутствие идей, а отсутствие <span className="text-brand">доверия</span>. Мы
                находим такие команды, проверяем их по-настоящему и говорим рынку:{" "}
                <span className="gradient-text">этим — можно верить.</span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid h-full gap-4">
              <div className="bento bento-pad">
                <Icon name="shield" className="h-6 w-6 text-brand" />
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  Мы относимся к статусу резидента как к репутационному активу — и защищаем его от
                  обесценивания.
                </p>
              </div>
              <div className="bento bento-pad bg-brand/[0.06]">
                <div className="font-display text-2xl font-semibold text-white">{site.tagline}</div>
                <p className="mt-2 text-sm text-white/50">Наш принцип в одной строке.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-12">
        <SectionHeading eyebrow="Принципы" title="Во что мы верим" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 80}>
              <div className="bento bento-pad bento-hover h-full">
                <span className="font-mono text-sm text-brand">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-20">
        <Reveal>
          <div className="bento relative overflow-hidden p-10 text-center sm:p-14">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_50%_120%,rgba(41,141,255,0.3),transparent_60%)]" />
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Если ваш проект достоин доверия — мы это подтвердим
            </h2>
            <div className="mt-8 flex justify-center gap-3">
              <Link href="/zayavka" className="btn-primary">
                Подать заявку <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="/kak-stat-rezidentom" className="btn-ghost">
                Как это работает
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
