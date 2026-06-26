import fs from "fs";
import path from "path";
import { site } from "./site";

/**
 * Лёгкий файловый слой данных (JSON). Работает без внешней БД —
 * идеально для запуска и демо. Для продакшена структура готова к замене
 * на Postgres (Supabase/Neon): достаточно переписать функции чтения/записи.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const RES_FILE = path.join(DATA_DIR, "residents.json");
const APP_FILE = path.join(DATA_DIR, "applications.json");

export type Resident = {
  id: string; // NSR-2026-0001
  project: string;
  tagline: string;
  description: string;
  category: string;
  city: string;
  website?: string;
  founders: string;
  recognizedAt: string; // ISO date
  status: "active";
  tier: "Резидент";
};

export type Application = {
  ref: string;
  project: string;
  tagline: string;
  description: string;
  category: string;
  city: string;
  website?: string;
  founders: string;
  email: string;
  telegram?: string;
  stage: string;
  ai: string;
  createdAt: string;
  status: "new" | "review" | "recognized" | "declined";
  residentId?: string;
};

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(RES_FILE)) fs.writeFileSync(RES_FILE, JSON.stringify(seedResidents, null, 2));
  if (!fs.existsSync(APP_FILE)) fs.writeFileSync(APP_FILE, "[]");
}

export function getResidents(): Resident[] {
  ensure();
  return JSON.parse(fs.readFileSync(RES_FILE, "utf8"));
}

export function getResident(id: string): Resident | undefined {
  return getResidents().find((r) => r.id.toLowerCase() === id.toLowerCase());
}

export function getApplications(): Application[] {
  ensure();
  return JSON.parse(fs.readFileSync(APP_FILE, "utf8"));
}

function writeApplications(apps: Application[]) {
  ensure();
  fs.writeFileSync(APP_FILE, JSON.stringify(apps, null, 2));
}

function writeResidents(res: Resident[]) {
  ensure();
  fs.writeFileSync(RES_FILE, JSON.stringify(res, null, 2));
}

export function addApplication(input: Omit<Application, "ref" | "createdAt" | "status">): Application {
  const apps = getApplications();
  const ref = "AP-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const app: Application = {
    ...input,
    ref,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  apps.unshift(app);
  writeApplications(apps);
  return app;
}

function nextId(): string {
  const year = new Date().getFullYear();
  const res = getResidents();
  const n = res.filter((r) => r.id.includes(String(year))).length + 1;
  return `${site.idPrefix}-${year}-${String(n).padStart(4, "0")}`;
}

export function setApplicationStatus(ref: string, status: Application["status"]): Application | undefined {
  const apps = getApplications();
  const app = apps.find((a) => a.ref === ref);
  if (!app) return undefined;
  app.status = status;

  if (status === "recognized" && !app.residentId) {
    const id = nextId();
    app.residentId = id;
    const resident: Resident = {
      id,
      project: app.project,
      tagline: app.tagline,
      description: app.description,
      category: app.category,
      city: app.city,
      website: app.website,
      founders: app.founders,
      recognizedAt: new Date().toISOString(),
      status: "active",
      tier: "Резидент",
    };
    const res = getResidents();
    res.unshift(resident);
    writeResidents(res);
  }
  writeApplications(apps);
  return app;
}

const seedResidents: Resident[] = [
  {
    id: "NSR-2026-0001",
    project: "Helix AI",
    tagline: "Голосовой ассистент для клиник",
    description:
      "Helix AI автоматизирует запись пациентов и первичную маршрутизацию обращений с помощью голосового ИИ, снижая нагрузку на регистратуру до 60%.",
    category: "HealthTech · ИИ",
    city: "Москва",
    website: "https://example.com",
    founders: "Анна Кравцова, Дмитрий Лебедев",
    recognizedAt: "2026-02-14T10:00:00.000Z",
    status: "active",
    tier: "Резидент",
  },
  {
    id: "NSR-2026-0002",
    project: "Quanta Vision",
    tagline: "Компьютерное зрение для промышленности",
    description:
      "Платформа дефектоскопии на конвейере: модели CV находят брак в реальном времени и интегрируются с MES-системами завода.",
    category: "Industrial · ИИ",
    city: "Казань",
    website: "https://example.com",
    founders: "Ринат Сафин",
    recognizedAt: "2026-03-02T10:00:00.000Z",
    status: "active",
    tier: "Резидент",
  },
  {
    id: "NSR-2026-0003",
    project: "Lumen Tutor",
    tagline: "Персональный ИИ-репетитор",
    description:
      "Адаптивная образовательная среда, которая выстраивает индивидуальную траекторию обучения школьника по результатам диагностики.",
    category: "EdTech · ИИ",
    city: "Санкт-Петербург",
    founders: "Мария Орлова, Павел Гущин",
    recognizedAt: "2026-03-28T10:00:00.000Z",
    status: "active",
    tier: "Резидент",
  },
  {
    id: "NSR-2026-0004",
    project: "AgroSense",
    tagline: "ИИ-агроном для полей",
    description:
      "Спутниковая аналитика и модели прогноза урожайности помогают агрохолдингам точнее планировать внесение удобрений и полив.",
    category: "AgroTech · ИИ",
    city: "Краснодар",
    founders: "Игорь Демин",
    recognizedAt: "2026-04-11T10:00:00.000Z",
    status: "active",
    tier: "Резидент",
  },
];
