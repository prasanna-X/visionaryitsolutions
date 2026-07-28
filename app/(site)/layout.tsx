import Nav from "@/components/home/Nav";
import Footer from "@/components/home/Footer";
import { C } from "@/components/tokens";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: "100vh" }}>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
