import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { ProductCatalog } from "@/components/product-catalog";
import { StoreSection } from "@/components/store-section";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { getActiveProducts } from "@/lib/products-db";

export default function Home() {
  const products = getActiveProducts();

  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <ProductCatalog products={products} />
      <StoreSection />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
