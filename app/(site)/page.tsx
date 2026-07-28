import Hero from "@/components/home/Hero";
import Approach from "@/components/home/Approach";
import Process from "@/components/home/Process";
import ServicesPage from "@/app/(site)/services/page";
import ProductsPage from "@/app/(site)/products/page";
import ContactPage from "@/app/(site)/contact/page";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesPage />
      <Approach />
      <Process />
      <ProductsPage />
      <ContactPage />
    </main>
  );
}
