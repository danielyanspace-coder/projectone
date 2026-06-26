import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-center justify-center pt-20 text-center">
      <div className="pill">Ошибка 404</div>
      <h1 className="mt-6 font-display text-6xl font-semibold tracking-tight text-white text-glow">404</h1>
      <p className="mt-4 max-w-sm text-white/55">
        Страница не найдена. Возможно, ссылка устарела или ID указан неверно.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">
          На главную <Icon name="arrow" className="h-4 w-4" />
        </Link>
        <Link href="/proverka" className="btn-ghost">
          Проверить ID
        </Link>
      </div>
    </section>
  );
}
