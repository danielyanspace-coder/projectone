import React from "react";

const paths: Record<string, React.ReactNode> = {
  id: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M13 9h5M13 13h5M5.5 15.5c.6-1.4 1.7-2 3-2s2.4.6 3 2" />
    </>
  ),
  badge: (
    <>
      <path d="M12 3l2.2 1.3 2.5-.3 1 2.3 2 1.6-.8 2.4.8 2.4-2 1.6-1 2.3-2.5-.3L12 21l-2.2-1.4-2.5.3-1-2.3-2-1.6.8-2.4-.8-2.4 2-1.6 1-2.3 2.5.3z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </>
  ),
  certificate: (
    <>
      <rect x="4" y="4" width="16" height="13" rx="2" />
      <path d="M8 9h8M8 12h5" />
      <circle cx="12" cy="18.5" r="2.2" />
      <path d="M10.5 20l-1 2.5 2.5-1 2.5 1-1-2.5" />
    </>
  ),
  page: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 15h6M9 18h3" />
    </>
  ),
  media: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </>
  ),
  community: (
    <>
      <circle cx="8" cy="9" r="3" />
      <circle cx="17" cy="10" r="2.4" />
      <path d="M3.5 19c.6-2.8 2.4-4.2 4.5-4.2s3.9 1.4 4.5 4.2M15 19c.4-1.8 1.4-2.8 2.8-2.8 1.2 0 2.2.8 2.7 2.2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  check: <path d="M5 12l4 4L19 7" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17L17 7M9 7h8v8" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4" />
    </>
  ),
  spark: <path d="M12 3v6m0 6v6m9-9h-6m-6 0H3m13.5-6.5l-3 3m-3 3l-3 3m12 0l-3-3m-3-3l-3-3" />,
};

export function Icon({
  name,
  className = "h-5 w-5",
  stroke = 1.6,
}: {
  name: keyof typeof paths | string;
  className?: string;
  stroke?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name] ?? paths.spark}
    </svg>
  );
}
