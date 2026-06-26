import type { Metadata } from "next";
import { PageHero } from "@/components/Section";
import { ApplyForm } from "@/components/ApplyForm";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Подать заявку" };

const aside = [
  { t: "10 минут", b: "Столько занимает заявка. Без бюрократии." },
  { t: "1–5 дней", b: "Рассмотрение Экспертным советом." },
  { t: "Взнос потом", b: "Платите только после признания проекта." },
];

export default function Apply() {
  return (
    <>
      <PageHero
        eyebrow="Заявка на резидентство"
        title={<>Представьте проект совету</>}
        sub="Расскажите о продукте, команде и технологии. Если совет признает проект — вы получите приглашение в резиденты Nova."
      />
      <section className="container-x py-12">
        <div className="grid gap-4 lg:grid-cols-[1fr_2.2fr]">
          <Reveal>
            <div className="grid gap-4 lg:sticky lg:top-24 lg:self-start">
              {aside.map((a) => (
                <div key={a.t} className="bento bento-pad">
                  <Icon name="spark" className="h-5 w-5 text-brand" />
                  <div className="mt-3 font-display text-2xl font-semibold text-white">{a.t}</div>
                  <p className="mt-1 text-sm text-white/45">{a.b}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ApplyForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
