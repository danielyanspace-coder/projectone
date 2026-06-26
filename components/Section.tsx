import { Reveal } from "./Reveal";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="pill">
      <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse-ring" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Reveal>
          <div className={center ? "flex justify-center" : ""}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        </Reveal>
      )}
      <Reveal delay={60}>
        <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={120}>
          <p className="mt-4 text-base leading-relaxed text-white/55 sm:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-hair">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(41,141,255,0.18),transparent_70%)]" />
      <div className="container-x relative pt-32 pb-14 sm:pt-40 sm:pb-20">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={140}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/55">{sub}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
