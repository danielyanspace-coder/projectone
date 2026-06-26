"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled ? "border-b border-hair bg-black/70 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                    active ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/proverka" className="text-sm text-white/55 transition-colors hover:text-white">
              Проверить ID
            </Link>
            <Link href="/zayavka" className="btn-primary">
              Подать заявку
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-hair md:hidden"
            aria-label="Меню"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`overflow-hidden border-b border-hair bg-black/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-3 text-base text-white/80 hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/proverka" className="rounded-xl px-4 py-3 text-base text-white/80 hover:bg-white/5">
            Проверить ID
          </Link>
          <Link href="/zayavka" className="btn-primary mt-2">
            Подать заявку
          </Link>
        </div>
      </div>
    </header>
  );
}
