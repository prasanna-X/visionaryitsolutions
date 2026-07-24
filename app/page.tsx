import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Approach from "@/components/Approach";
import Process from "@/components/Process";
import Products from "@/components/Products";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { C } from "@/components/tokens";

export default function Home() {
  return (
    <div style={{ background: C.bg, color: C.ink }} className="min-h-screen w-full">
      <Nav />
      <Hero />
      <Services />
      <Approach />
      <Process />
      <Products />
      <Contact />
      <Footer />
    </div>
  );
}
