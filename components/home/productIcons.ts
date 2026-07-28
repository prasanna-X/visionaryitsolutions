// components/home/productIcons.tsx
import {
  Calendar,
  ShoppingBag,
  Video,
  Package,
  type LucideIcon,
} from "lucide-react";

// Map the keyword stored in products.logo (when it's not a URL) to an icon.
const ICON_MAP: Record<string, LucideIcon> = {
  calendar: Calendar,
  shopping: ShoppingBag,
  video: Video,
};

const DEFAULT_ICON: LucideIcon = Package;

export function getProductIcon(key?: string | null): LucideIcon {
  if (!key) return DEFAULT_ICON;
  return ICON_MAP[key.toLowerCase()] ?? DEFAULT_ICON;
}

// True if the logo value looks like something next/image can load
// (absolute URL or a root-relative path), rather than an icon keyword.
export function isImageSrc(value?: string | null): value is string {
  if (!value) return false;
  return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
}