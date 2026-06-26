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
  return (
    <>
      <PageHero
        eyebrow={`${residents.length} признанных проектов`}
        title={<>Реестр резидентов Nova</>}
        sub="Официальный список признанных технологических команд. Подлинность каждого резидента можно проверить по ID."
      />
      <section className="container-x py-12">
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
