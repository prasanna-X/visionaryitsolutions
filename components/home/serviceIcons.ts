import { Code2, Cloud, Wrench, Bot, ShieldCheck, LineChart, type LucideIcon } from "lucide-react";

/* Services table stores the exact Lucide component name as a string,
   e.g. "ShieldCheck", "Bot", "Cloud", "Code2", "LineChart", "Wrench". */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  code2: Code2,
  cloud: Cloud,
  wrench: Wrench,
  bot: Bot,
  shieldcheck: ShieldCheck,
  linechart: LineChart,
};

export function getServiceIcon(key?: string | null): LucideIcon {
  if (!key) return Code2;

  // Normalize case/spacing so "ShieldCheck", "shieldcheck", "Shield Check" all match.
  const normalized = key.trim().toLowerCase().replace(/[\s_-]/g, "");
  const icon = SERVICE_ICONS[normalized];

  if (!icon && process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(`[getServiceIcon] No icon mapped for key: "${key}" — falling back to Code2.`);
  }

  return icon ?? Code2;
}