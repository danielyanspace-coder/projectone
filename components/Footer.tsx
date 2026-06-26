import Link from "next/link";
import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { AuroraBackground } from "./motion/AuroraBackground";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-24">
      {/* CTA band */}
      <div className="container-x">
        <div className="bento relative overflow-hidden p-8 text-center sm:p-12">
          <AuroraBackground variant="band" />
          <h2 className="mx-auto max-w-xl font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Думаете, ваш проект достоин признания?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/55">
            Подайте заявку — вердикт вынесет Экспертный совет. Взнос только после признания.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/zayavka" className="btn-primary">
              Подать заявку <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link href="/proverka" className="btn-ghost">
              Проверить ID
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-hair">
        <div className="container-x py-14">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">{site.manifesto}</p>
              <div className="mt-5 flex gap-2.5">
                <Social href={site.telegram} label="Telegram" path="M21 4L3 11l5 2 2 6 3-4 5 4z" />
                <Social
                  href={site.instagram}
                  label="Instagram"
                  rect
                />
              </div>
            </div>

            {footerNav.map((col) => (
              <div key={col.title}>
                <div className="mono-label mb-4">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-white/55 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-hair pt-6 text-xs text-white/35 sm:flex-row sm:items-center">
            <span>
              © {new Date().getFullYear()} {site.name}. Все права защищены.
            </span>
            <span className="font-mono">{site.email} · Признание, которое подтверждает делом</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, path, rect = false }: { href: string; label: string; path?: string; rect?: boolean }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-hair text-white/55 transition hover:border-brand hover:text-brand"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {rect ? (
          <>
            <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
          </>
        ) : (
          <path d={path} />
        )}
      </svg>
    </Link>
  );
}
