export function LegalDoc({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string[] }[];
}) {
  return (
    <section className="container-x pt-28 pb-16 sm:pt-36">
      <div className="mx-auto max-w-3xl">
        <span className="pill">Документ</span>
        <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
        <div className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-white/35">
          Редакция от {updated}
        </div>

        <div className="mt-8 rounded-xl border border-hair bg-white/[0.02] p-5 text-sm leading-relaxed text-white/55">
          {intro}
        </div>

        <div className="mt-10 space-y-9">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold text-white">
                {i + 1}. {s.h}
              </h2>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-white/60">
                {s.p.map((par, j) => (
                  <p key={j}>{par}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-4 text-xs leading-relaxed text-amber-200/70">
          Это типовой шаблон. Перед публикацией финализируйте документ с юристом и подставьте реквизиты
          организации.
        </p>
      </div>
    </section>
  );
}
