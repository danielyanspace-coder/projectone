import type { Metadata } from "next";
import { PageHero } from "@/components/Section";
import { VerifyForm } from "@/components/VerifyForm";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "Проверить ID резидента" };

const facts = [
  { t: "Что это", b: "Сервис проверки подлинности. Введите резидентский ID — увидите официальную карточку проекта." },
  { t: "Откуда ID", b: "ID указан на сертификате резидента и в плашке «Резидент Nova». Тот же результат даёт QR-код." },
  { t: "Зачем", b: "Чтобы инвестор, партнёр или клиент мог за секунду убедиться: проект действительно признан Nova." },
];

export default function Verify() {
  return (
    <>
      <PageHero
        eyebrow="Проверка подлинности"
        title={<>Проверить резидента по ID</>}
        sub="Подлинность статуса резидента Nova подтверждается онлайн. Никаких посредников — только официальный реестр."
      />
      <section className="container-x py-12">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <VerifyForm />
          </Reveal>
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 70}>
              <div className="bento bento-pad h-full">
                <Icon name="shield" className="h-5 w-5 text-brand" />
                <h3 className="mt-3 text-sm font-semibold text-white">{f.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/45">{f.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
