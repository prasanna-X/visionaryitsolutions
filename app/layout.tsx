import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vivaan IT Solutions | Kathmandu",
  description:
    "Vivaan IT Solutions builds web platforms, cloud systems, AI automation, and custom software for growing businesses in Kathmandu, Nepal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}