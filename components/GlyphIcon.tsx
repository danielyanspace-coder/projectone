// Designer duotone icons: gradient fill plate + crisp white linework.
const glyphs: Record<string, React.ReactNode> = {
  id: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" fill="url(#gi-fill)" opacity="0.22" />
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="url(#gi-stroke)" />
      <circle cx="8.5" cy="11" r="2.1" stroke="#fff" />
      <path d="M13 9.5h5M13 12.5h5M5.6 15.4c.5-1.3 1.6-2 2.9-2s2.4.7 2.9 2" stroke="#fff" />
    </>
  ),
  badge: (
    <>
      <path d="M12 2.5l2.4 1.5 2.8-.2.9 2.7 2.2 1.7-.9 2.7.9 2.7-2.2 1.7-.9 2.7-2.8-.2L12 21.5l-2.4-1.5-2.8.2-.9-2.7-2.2-1.7.9-2.7-.9-2.7 2.2-1.7.9-2.7 2.8.2z" fill="url(#gi-fill)" opacity="0.22" stroke="url(#gi-stroke)" />
      <path d="M9 12l2 2 4-4.2" stroke="#fff" />
    </>
  ),
  certificate: (
    <>
      <rect x="3.5" y="3.5" width="17" height="12" rx="2.5" fill="url(#gi-fill)" opacity="0.2" stroke="url(#gi-stroke)" />
      <path d="M7 7.5h10M7 10.5h6" stroke="#fff" />
      <circle cx="12" cy="18.5" r="2.6" stroke="url(#gi-stroke)" />
      <path d="M10.2 20.3l-1 2.7 2.8-1.1 2.8 1.1-1-2.7" stroke="#fff" />
    </>
  ),
  page: (
    <>
      <path d="M6 3.5h7l5 5v12H6z" fill="url(#gi-fill)" opacity="0.2" stroke="url(#gi-stroke)" />
      <path d="M13 3.5V8.5h5" stroke="url(#gi-stroke)" />
      <path d="M9 12.5h6M9 15.5h6M9 18.5h3" stroke="#fff" />
    </>
  ),
  media: (
    <>
      <circle cx="12" cy="12" r="8.5" fill="url(#gi-fill)" opacity="0.18" stroke="url(#gi-stroke)" />
      <path d="M3.5 12h17M12 3.5c2.5 2.6 2.5 14.4 0 17M12 3.5c-2.5 2.6-2.5 14.4 0 17" stroke="#fff" />
    </>
  ),
  community: (
    <>
      <circle cx="9" cy="9" r="3" fill="url(#gi-fill)" opacity="0.22" stroke="url(#gi-stroke)" />
      <circle cx="17" cy="10.5" r="2.3" stroke="url(#gi-stroke)" />
      <path d="M3.6 19c.7-2.8 2.6-4.2 5.4-4.2 1.6 0 3 .5 4 1.5M14.5 19c.4-1.7 1.6-2.7 3.2-2.7 1.2 0 2.2.6 2.8 1.7" stroke="#fff" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8l7.5 3.2v5c0 4.7-3.2 8.2-7.5 9.6-4.3-1.4-7.5-4.9-7.5-9.6V6z" fill="url(#gi-fill)" opacity="0.2" stroke="url(#gi-stroke)" />
      <path d="M8.7 12l2.3 2.3 4.3-4.5" stroke="#fff" />
    </>
  ),
  spark: (
    <path d="M12 3l2 6.5L20.5 12 14 14l-2 6.5L10 14 3.5 12 10 9.5z" fill="url(#gi-fill)" opacity="0.3" stroke="url(#gi-stroke)" />
  ),
};

export function GlyphIcon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <defs>
        <linearGradient id="gi-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7db4ff" />
          <stop offset="1" stopColor="#298DFF" />
        </linearGradient>
        <linearGradient id="gi-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a9cdff" />
          <stop offset="1" stopColor="#4a98ff" />
        </linearGradient>
      </defs>
      {glyphs[name] ?? glyphs.spark}
    </svg>
  );
}
