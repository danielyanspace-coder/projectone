import Link from "next/link";
import { Logo } from "./Logo";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-hair">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">{site.manifesto}</p>
            <div className="mt-5 flex gap-3">
              <Link href={site.telegram} className="pill hover:border-hairlit">
                Telegram
              </Link>
              <Link href={site.instagram} className="pill hover:border-hairlit">
                Instagram
              </Link>
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
          <span>© {new Date().getFullYear()} {site.name}. Все права защищены.</span>
          <span className="font-mono">
            {site.email} · Признание, которое подтверждает делом
          </span>
        </div>
      </div>
    </footer>
  );
}
