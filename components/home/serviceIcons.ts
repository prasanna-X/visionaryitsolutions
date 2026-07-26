import { Code2, Cloud, Wrench, Bot, ShieldCheck, LineChart, type LucideIcon } from "lucide-react";

/* Services are stored in the DB with a plain string `icon` key (see
   prisma/schema.prisma → Service.icon) since React components can't be
   persisted. This maps that key to the actual lucide icon used on the
   public site and in the dashboard. Keep keys in sync with the <select>
   options in ServiceForm. */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  code: Code2,
  cloud: Cloud,
  wrench: Wrench,
  bot: Bot,
  shield: ShieldCheck,
  chart: LineChart,
};

export function getServiceIcon(key?: string | null): LucideIcon {
  return (key && SERVICE_ICONS[key]) || Code2;
}
