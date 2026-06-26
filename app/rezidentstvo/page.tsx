import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { PerkCard } from "@/components/Bits";
import { Icon } from "@/components/Icon";
import { perks } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Резидентство" };

const included = [
  "Резидентский ID и проверка в публичном реестре",
  "Дизайнерский сертификат в рамке с QR-кодом",
  "Плашка «Резидент Nova» для сайта и соцсетей",
  "Личная страница проекта в официальном реестре",
  "Статья о проекте на сайте и в блоге Nova",
  "Публикация в Instagram сообщества",
  "Размещения на 30–50 трастовых площадках, VC и Дзен",
  "Доступ в закрытое сообщество резидентов и экспертов",
  "Право указывать «при поддержке Nova»",
];

export default function Residency() {
  return (
    <>
      <PageHero
        eyebrow="Годовое резидентство"
        title={<>Что значит быть резидентом Nova</>}
        sub="Резидентство — это членство в сообществе признанных технологических команд. Оно действует 12 месяцев и подтверждается единым членским взносом — только после признания совета."
      />

      {/* membership summary bento */}
      <section className="container-x py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="bento bento-pad flex h-full flex-col justify-between p-8">
              <div>
                <span className="pill">Членство</span>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Один взнос. Целый год признания.
                </h2>
                <p className="mt-4 max-w-lg text-white/55">
                  Никаких тарифов и подписок. Это членский взнос сообщества — он идёт на развитие
                  экосистемы, продвижение резидентов и работу Экспертного совета.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/zayavka" className="btn-primary">
                  Подать заявку <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link href="/kak-stat-rezidentom" className="btn-ghost">
                  Как стать резидентом
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="bento relative flex h-full flex-col justify-between overflow-hidden bento-pad p-8">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_90%_at_80%_0%,rgba(41,141,255,0.18),transparent_60%)]" />
              <div className="mono-label">Членский взнос</div>
              <div>
                <div className="font-display text-6xl font-semibold tracking-tight text-white">
                  {site.fee}
                </div>
                <div className="mt-2 text-sm text-white/50">за 12 месяцев резидентства</div>
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-xl border border-hair bg-white/[0.02] px-3 py-2.5">
                <Icon name="check" className="h-4 w-4 text-brand" />
                <span className="text-xs text-white/60">Оплачивается только после признания</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* perks */}
      <section className="container-x py-12">
        <SectionHeading eyebrow="Состав резидентства" title="Что входит" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 60} className={p.big ? "sm:col-span-2" : ""}>
              <PerkCard {...p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* checklist */}
      <section className="container-x py-16">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Чек-лист" title="Всё, что получает резидент" />
          <Reveal delay={100}>
            <div className="bento bento-pad">
              <ul className="grid gap-3 sm:grid-cols-2">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <Icon name="check" className="h-3 w-3" stroke={2.4} />
                    </span>
                    <span className="text-sm leading-relaxed text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
