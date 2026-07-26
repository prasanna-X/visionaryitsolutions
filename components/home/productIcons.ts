import { CalendarCheck, ShoppingBag, Clapperboard, Package, type LucideIcon } from "lucide-react";

/* Products are stored in Supabase with a plain string `icon` key (see
   types/product.ts) since React components can't be persisted. This maps
   that key to the actual lucide icon shown on /products. Keep keys in
   sync with the <select> options in ProductForm. */
export const PRODUCT_ICONS: Record<string, LucideIcon> = {
  calendar: CalendarCheck,
  shopping: ShoppingBag,
  video: Clapperboard,
  package: Package,
};

export function getProductIcon(key?: string | null): LucideIcon {
  return (key && PRODUCT_ICONS[key]) || Package;
}
