import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-7 w-7 items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
          <defs>
            <linearGradient id="nova-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#5aa6ff" />
              <stop offset="1" stopColor="#298DFF" />
            </linearGradient>
          </defs>
          <path
            d="M16 2l3.4 9.1L29 14l-9.6 2.9L16 26l-3.4-9.1L3 14l9.6-2.9z"
            fill="url(#nova-g)"
          />
          <circle cx="16" cy="14" r="2.4" fill="#000" opacity="0.85" />
        </svg>
        <span className="absolute inset-0 -z-10 rounded-full bg-brand/40 blur-md opacity-0 transition-opacity group-hover:opacity-100" />
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-white">
        Nova<span className="text-white/55"> Scout</span>
      </span>
    </Link>
  );
}
