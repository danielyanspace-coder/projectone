// Animated blurred aurora blobs. Pure CSS animation, no JS needed.
export function AuroraBackground({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "soft" | "band";
  className?: string;
}) {
  if (variant === "band") {
    return (
      <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden>
        <div
          className="aura aura-2 absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(circle,#1f73d6,transparent 62%)" }}
        />
      </div>
    );
  }
  if (variant === "soft") {
    return (
      <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden>
        <div
          className="aura aura-2 absolute -left-20 top-0 h-[34vw] w-[34vw]"
          style={{ background: "radial-gradient(circle,#1f73d6,transparent 65%)", opacity: 0.5 }}
        />
        <div
          className="aura aura-3 absolute -right-20 top-1/3 h-[30vw] w-[30vw]"
          style={{ background: "radial-gradient(circle,#3a7bd5,transparent 65%)", opacity: 0.45 }}
        />
      </div>
    );
  }
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden>
      <div
        className="aura aura-1 absolute bottom-[-25vw] left-1/2 h-[62vw] w-[62vw] -translate-x-1/2"
        style={{ background: "radial-gradient(circle,#298DFF,#1b5fb0 45%,transparent 70%)" }}
      />
      <div
        className="aura aura-2 absolute left-[6%] top-[16%] h-[40vw] w-[40vw]"
        style={{ background: "radial-gradient(circle,#1f73d6,transparent 65%)" }}
      />
      <div
        className="aura aura-3 absolute right-[5%] top-[28%] h-[36vw] w-[36vw]"
        style={{ background: "radial-gradient(circle,#3a7bd5,transparent 65%)" }}
      />
    </div>
  );
}
