import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Section";
import { RegistryExplorer } from "@/components/RegistryExplorer";
import { Icon } from "@/components/Icon";
import { getResidents } from "@/lib/store";

export const metadata: Metadata = { title: "Реестр резидентов" };
export const dynamic = "force-dynamic";

export default function Registry() {
  const residents = getResidents();
  const categoriesCount = new Set(residents.map((r) => r.category.split("·")[0].trim())).size;
  return (
    <>
      <PageHero
        eyebrow={`${residents.length} признанных проектов`}
        title={<>Реестр резидентов Nova</>}
        sub="Официальный список признанных технологических команд. Подлинность каждого резидента можно проверить по ID."
      />
      <section className="container-x py-12">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="bento spot bento-pad">
            <div className="font-display text-3xl font-semibold text-brand">{residents.length}</div>
            <p className="mt-1.5 text-sm text-white/45">действующих резидентов</p>
          </div>
          <div className="bento spot bento-pad">
            <div className="font-display text-3xl font-semibold text-white">{categoriesCount} </div>
            <p className="mt-1.5 text-sm text-white/45">технологических направлений</p>
          </div>
          <div className="bento spot bento-pad">
            <div className="font-display text-3xl font-semibold text-white">100%</div>
            <p className="mt-1.5 text-sm text-white/45">статусов проверяемы по ID</p>
          </div>
        </div>
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Link href="/proverka" className="btn-ghost">
            <Icon name="search" className="h-4 w-4" /> Проверить ID резидента
          </Link>
        </div>
        <RegistryExplorer residents={residents} />
      </section>
    </>
  );
}
