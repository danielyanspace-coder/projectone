"use client";

import { Icon } from "./Icon";

export function PrintButton() {
  return (
    <button onClick={() => window.print()} className="btn-ghost no-print">
      <Icon name="arrowUpRight" className="h-4 w-4" /> Печать / сохранить PDF
    </button>
  );
}
