// components/home/productIcons.tsx
import {
  Calendar,
  ShoppingBag,
  Video,
  Package,
  type LucideIcon,
} from "lucide-react";

/* Products table stores an icon key in `logo` when it's not an image URL.
   Exported as PRODUCT_ICONS so the dashboard's ProductForm can render
   a picker (e.g. Object.entries(PRODUCT_ICONS).map(...)). Keys are the
   normalized (lowercase, no spaces/dashes) form of the Lucide component name,
   e.g. "Calendar" -> "calendar", "ShoppingBag" -> "shoppingbag". */
export const PRODUCT_ICONS: Record<string, LucideIcon> = {
  calendar: Calendar,
  shoppingbag: ShoppingBag,
  video: Video,
  package: Package,
};

// Kept for any existing imports; same data as PRODUCT_ICONS.
export const ICON_MAP = PRODUCT_ICONS;

const DEFAULT_ICON: LucideIcon = Package;

function normalize(key: string): string {
  return key.trim().toLowerCase().replace(/[\s_-]/g, "");
}

export function getProductIcon(key?: string | null): LucideIcon {
  if (!key) return DEFAULT_ICON;

  const icon = PRODUCT_ICONS[normalize(key)];

  if (!icon && process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(`[getProductIcon] No icon mapped for key: "${key}" — falling back to Package.`);
  }

  return icon ?? DEFAULT_ICON;
}

// True if the logo value looks like something next/image can load
// (absolute URL or a root-relative path), rather than an icon keyword.
export function isImageSrc(value?: string | null): value is string {
  if (!value) return false;
  return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
}