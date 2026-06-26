import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { getResident } from "@/lib/store";
import { site } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { PrintButton } from "@/components/PrintButton";
import { Icon } from "@/components/Icon";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const r = getResident(params.id);
  return { title: r ? `Сертификат — ${r.project}` : "Сертификат" };
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export default async function Certificate({ params }: { params: { id: string } }) {
  const r = getResident(params.id);
  if (!r) notFound();

  const profileUrl = `${site.url}/rezident/${r.id}`;
  const qr = await QRCode.toDataURL(profileUrl, {
    margin: 0,
    width: 320,
    color: { dark: "#ffffff", light: "#00000000" },
    errorCorrectionLevel: "M",
  });

  return (
    <section className="container-x pt-28 pb-20 sm:pt-32">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link href={`/rezident/${r.id}`} className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white">
          <Icon name="arrow" className="h-4 w-4 rotate-180" /> К профилю резидента
        </Link>
        <PrintButton />
      </div>

      {/* Certificate */}
      <div className="mx-auto max-w-3xl">
        <div className="certificate relative overflow-hidden rounded-[28px] p-[2px]">
          <div className="relative rounded-[26px] bg-ink-900 px-8 py-12 sm:px-14 sm:py-16">
            {/* corner ticks */}
            <Corner className="left-5 top-5" />
            <Corner className="right-5 top-5 rotate-90" />
            <Corner className="bottom-5 left-5 -rotate-90" />
            <Corner className="bottom-5 right-5 rotate-180" />

            <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_-10%,rgba(41,141,255,0.18),transparent_60%)]" />

            <div className="flex items-center justify-between">
              <Logo />
              <span className="pill">Сертификат резидента</span>
            </div>

            <div className="mt-12 text-center">
              <div className="mono-label">Настоящим подтверждается, что проект</div>
              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {r.project}
              </h1>
              <p className="mt-3 text-white/55">{r.tagline}</p>
              <p className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-white/55">
                признан Экспертным советом Nova и является официальным{" "}
                <span className="text-brand">резидентом сообщества</span> сроком на {site.term}.
              </p>
            </div>

            <div className="mt-12 flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-end">
              <div className="space-y-4 text-left">
                <CertRow k="Резидентский ID" v={r.id} mono />
                <CertRow k="Дата признания" v={fmt(r.recognizedAt)} />
                <CertRow k="Категория" v={r.category} />
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="rounded-2xl border border-hair bg-white/[0.02] p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qr} alt="QR проверки подлинности" className="h-28 w-28" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                  Сканируйте для проверки
                </span>
              </div>
            </div>

            <div className="mt-12 flex items-end justify-between border-t border-hair pt-6">
              <div>
                <div className="font-[cursive] text-2xl text-white/85">Nova Council</div>
                <div className="mono-label mt-1">Экспертный совет</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/70">{site.name}</div>
                <div className="mono-label mt-1">{site.url.replace("https://", "")}</div>
              </div>
            </div>
          </div>
        </div>

        <p className="no-print mt-6 text-center text-sm text-white/40">
          QR-код ведёт на{" "}
          <Link href={`/rezident/${r.id}`} className="text-brand hover:underline">
            официальную страницу резидента
          </Link>{" "}
          — это и есть подтверждение подлинности.
        </p>
      </div>
    </section>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <span className={`pointer-events-none absolute h-6 w-6 border-l border-t border-brand/50 ${className}`} />
  );
}

function CertRow({ k, v, mono = false }: { k: string; v: string; mono?: boolean }) {
  return (
    <div>
      <div className="mono-label">{k}</div>
      <div className={`mt-1 text-white ${mono ? "font-mono text-sm" : "text-base"}`}>{v}</div>
    </div>
  );
}
