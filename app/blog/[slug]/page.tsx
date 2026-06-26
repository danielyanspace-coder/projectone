import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { posts } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = posts.find((x) => x.slug === params.slug);
  return p ? { title: p.title, description: p.excerpt } : { title: "Статья" };
}

const bodies: Record<string, string[]> = {
  "chto-takoe-nova": [
    "Каждый день в России появляются десятки сильных технологических команд. У них есть продукт, есть результаты — но нет одного: внешнего сигнала, которому доверяет рынок. Инвестор, партнёр или клиент видит очередной лендинг и не понимает, можно ли верить.",
    "Nova Scout решает именно эту проблему. Мы — институт признания. Не рекламное агентство и не клуб по подписке, а совет практиков, который оценивает проекты по существу и публично подтверждает: этим — можно верить.",
    "Признание Nova нельзя купить. Сначала Экспертный совет рассматривает заявку, проверяет команду, продукт и добросовестность. И только если совет признаёт проект, основатели вносят годовой членский взнос и становятся резидентами. Деньги не покупают статус — они его подтверждают.",
    "Резидент получает проверяемый ID, дизайнерский сертификат, плашку «Резидент Nova» и волну публикаций. Но главное — он получает доверие, которое работает на него каждый день.",
  ],
  "kak-rabotaet-sovet": [
    "Экспертный совет Nova — это девять практиков: основатели проектов-резидентов, инженеры, маркетологи и новаторы команды. Каждый смотрит на заявку со своей стороны.",
    "Оценка идёт по единому чек-листу: есть ли в основе технология (предпочтительно ИИ), есть ли работающий продукт или прототип, стоит ли за проектом реальная команда, и нет ли признаков недобросовестности.",
    "Решение принимается коллегиально, большинством голосов. Эксперт не участвует в голосовании по проекту, с которым связан, — так мы защищаем планку от конфликта интересов.",
    "Именно поэтому «да» от Nova что-то значит. За ним стоит не один человек, а совет, который рискует собственной репутацией, признавая проект.",
  ],
  "helix-ai-rezident": [
    "Helix AI стал резидентом Nova под номером NSR-2026-0001. Команда из Москвы автоматизирует работу регистратур клиник с помощью голосового ИИ.",
    "Их ассистент принимает звонки, записывает пациентов и маршрутизирует обращения — снижая нагрузку на регистратуру до 60%. К моменту подачи заявки у проекта уже были первые клиники в работе.",
    "Совет признал Helix AI за зрелость продукта и понятную технологическую основу. Сегодня проект носит плашку «Резидент Nova», а его подлинность можно проверить по ID в публичном реестре.",
  ],
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default function Post({ params }: { params: { slug: string } }) {
  const p = posts.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const body = bodies[p.slug] ?? [p.excerpt];

  return (
    <article className="container-x pt-28 pb-16 sm:pt-36">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white">
        <Icon name="arrow" className="h-4 w-4 rotate-180" /> Все статьи
      </Link>

      <div className="mx-auto mt-8 max-w-2xl">
        <span className="pill">{p.tag}</span>
        <h1 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          {p.title}
        </h1>
        <div className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-white/35">{fmt(p.date)}</div>

        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-white/65">
          {body.map((par, i) => (
            <p key={i}>{par}</p>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-hair bg-brand/[0.06] p-6 text-center">
          <p className="text-white/70">Готовы получить признание совета?</p>
          <Link href="/zayavka" className="btn-primary mt-4">
            Подать заявку <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
