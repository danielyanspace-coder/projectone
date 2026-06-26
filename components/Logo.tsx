import Link from "next/link";

export function Logo({ className = "", animated = true }: { className?: string; animated?: boolean }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <svg viewBox="0 0 40 40" className="h-8 w-8 overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="nova-mark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7db4ff" />
              <stop offset="0.55" stopColor="#298DFF" />
              <stop offset="1" stopColor="#175aa8" />
            </linearGradient>
            <radialGradient id="nova-core" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#cfe4ff" />
              <stop offset="1" stopColor="#298DFF" />
            </radialGradient>
          </defs>

          {/* orbit ring */}
          <circle
            cx="20"
            cy="20"
            r="16.5"
            fill="none"
            stroke="url(#nova-mark)"
            strokeWidth="1"
            strokeOpacity="0.35"
            strokeDasharray="3 5"
            className={animated ? "nova-rot-slow" : ""}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />

          {/* four-point nova star */}
          <path
            d="M20 3.5 L23.2 16.8 L36.5 20 L23.2 23.2 L20 36.5 L16.8 23.2 L3.5 20 L16.8 16.8 Z"
            fill="url(#nova-mark)"
          />
          {/* secondary diagonal sparkle */}
          <path
            d="M20 9 L21.6 18.4 L31 20 L21.6 21.6 L20 31 L18.4 21.6 L9 20 L18.4 18.4 Z"
            fill="#0a0b0e"
            opacity="0.25"
          />
          <circle cx="20" cy="20" r="2.6" fill="url(#nova-core)" />

          {/* orbiting dot */}
          <g
            className={animated ? "nova-rot-fast" : ""}
            style={{ transformBox: "view-box", transformOrigin: "20px 20px" }}
          >
            <circle cx="36.5" cy="20" r="1.7" fill="#7db4ff" />
          </g>
        </svg>
        <span className="absolute inset-0 -z-10 rounded-full bg-brand/40 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-white">
        Nova<span className="text-white/55"> Scout</span>
      </span>
    </Link>
  );
}
