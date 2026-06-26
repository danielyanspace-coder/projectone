"use client";

import { useEffect, useRef } from "react";

export function DitherRing({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const c = ctx;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const S = 220;
    cv.width = S;
    cv.height = S;
    let a = 0;
    let raf = 0;

    function draw() {
      c.clearRect(0, 0, S, S);
      c.save();
      c.translate(S / 2, S / 2);
      c.rotate(a);
      for (let r = 48; r < 100; r += 5) {
        for (let t = 0; t < Math.PI * 2; t += 0.1) {
          const x = Math.cos(t) * r;
          const y = Math.sin(t) * r;
          c.beginPath();
          c.arc(x, y, 1.5, 0, 7);
          c.fillStyle = `rgba(90,166,255,${0.25 + 0.55 * ((r - 48) / 52)})`;
          c.fill();
        }
      }
      c.restore();
      a += 0.006;
      if (!reduce) raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
