"use client";

import { useEffect, useRef } from "react";

export function ParticleField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const c = ctx;
    const canvas = cv;

    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0;
    let pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let mx = -9999,
      my = -9999;

    function size() {
      const parent = canvas.parentElement;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = (parent?.offsetHeight || window.innerHeight) * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      const n = window.innerWidth < 700 ? 32 : 66;
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25 * dpr,
        vy: (Math.random() - 0.5) * 0.25 * dpr,
        r: (Math.random() * 1.6 + 0.5) * dpr,
      }));
    }
    size();

    const onResize = () => size();
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = (e.clientX - rect.left) * dpr;
      my = (e.clientY - rect.top) * dpr;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);

    const LINK = 120;
    function loop() {
      c.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dm = Math.hypot(p.x - mx, p.y - my);
        c.beginPath();
        c.arc(p.x, p.y, p.r, 0, 7);
        c.fillStyle = dm < LINK * dpr ? "rgba(120,180,255,.9)" : "rgba(150,180,230,.4)";
        c.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i],
            b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK * dpr) {
            c.beginPath();
            c.moveTo(a.x, a.y);
            c.lineTo(b.x, b.y);
            c.strokeStyle = `rgba(41,141,255,${0.16 * (1 - d / (LINK * dpr))})`;
            c.lineWidth = dpr;
            c.stroke();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className={`pointer-events-none ${className}`} aria-hidden />;
}
