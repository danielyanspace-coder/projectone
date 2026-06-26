"use client";

import { useEffect, useRef } from "react";

/**
 * Global cursor effects (desktop only):
 *  - soft glow that follows the pointer
 *  - delegated spotlight: sets --mx/--my on the nearest `.spot` card
 */
export function CursorFx() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e: PointerEvent) => {
      glow.style.opacity = "1";
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";

      const card = (e.target as HTMLElement)?.closest?.(".spot") as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      }
    };
    const onLeave = () => {
      if (glow) glow.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden />;
}
