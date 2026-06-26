import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { getResident, getResidents } from "@/lib/store";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const r = getResident(params.id);
  if (!r) return { title: "Резидент не найден" };
  return { title: `${r.project} — Резидент Nova`, description: r.tagline };
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default function ResidentProfile({ params }: { params: { id: string } }) {
  const r = getResident(params.id);
  if (!r) notFound();

  return (
    <section className="container-x pt-28 pb-16 sm:pt-36">
      <Reveal>
        <Link href="/reestr" className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white">
          <Icon name="arrow" className="h-4 w-4 rotate-180" /> Назад в реестр
        </Link>
      </Reveal>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {/* main */}
        <Reveal className="lg:col-span-2">
          <div className="bento relative overflow-hidden p-8 sm:p-10">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_100%_0%,rgba(41,141,255,0.14),transparent_60%)]" />
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
                <Icon name="check" className="h-3.5 w-3.5" stroke={2.4} /> Подлинность подтверждена
              </span>
              <span className="pill">{r.category}</span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {r.project}
            </h1>
            <p className="mt-3 text-lg text-white/60">{r.tagline}</p>
            <p className="mt-6 max-w-2xl leading-relaxed text-white/55">{r.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Detail label="Основатели" value={r.founders} />
              <Detail label="Город" value={r.city} />
              <Detail
                label="Сайт"
                value={
                  r.website ? (
                    <a href={r.website} className="text-brand hover:underline" target="_blank" rel="noreferrer">
                      Перейти ↗
                    </a>
                  ) : (
                    "—"
                  )
                }
              />
            </div>
          </div>
        </Reveal>

        {/* verification card */}
        <Reveal delay={100}>
          <div className="bento bento-pad flex h-full flex-col justify-between p-8">
            <div>
              <div className="mono-label">Резидентский ID</div>
              <div className="mt-2 font-mono text-2xl font-semibold text-white">{r.id}</div>
              <dl className="mt-6 space-y-4">
                <Row k="Статус" v={<span className="text-brand">Действующий резидент</span>} />
                <Row k="Признан" v={fmt(r.recognizedAt)} />
                <Row k="Срок" v={`${site.term}`} />
                <Row k="Плашка" v={site.residentBadge} />
              </dl>
            </div>
            <Link href={`/sertifikat/${r.id}`} className="btn-primary mt-8 w-full">
              <Icon name="certificate" className="h-4 w-4" /> Открыть сертификат
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="bento mt-4 flex flex-wrap items-center justify-between gap-4 bento-pad">
          <p className="text-sm text-white/50">
            Эта страница — официальное подтверждение, что проект является резидентом Nova. На неё ведёт
            QR-код с сертификата.
          </p>
          <Link href="/proverka" className="btn-ghost shrink-0">
            Проверить другой ID
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-hair bg-white/[0.02] p-4">
      <div className="mono-label">{label}</div>
      <div className="mt-1.5 text-sm text-white/80">{value}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-hair pb-3 text-sm">
      <dt className="text-white/40">{k}</dt>
      <dd className="text-white/80">{v}</dd>
    </div>
  );
}
