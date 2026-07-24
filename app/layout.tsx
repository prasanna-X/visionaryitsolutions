import "./globals.css";

export const metadata = {
  title: "Visionary IT Solutions | Kathmandu",
  description:
    "Visionary IT Solutions builds web platforms, cloud systems, AI automation, and custom software for growing businesses in Kathmandu, Nepal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
