"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CATEGORY_LABELS, type Category, type Product } from "@/data/products";

const CATEGORIES: Category[] = ["fiambreria", "carniceria"];

const WA_URL =
  "https://wa.me/542664444019?text=Hola%2C%20quer%C3%ADa%20consultar%20algo";

function formatPrice(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="font-semibold text-foreground text-sm leading-snug">
          {product.name}
        </p>
        {product.description && (
          <p className="text-xs text-foreground/50 mt-0.5">{product.description}</p>
        )}
        <p className="text-primary font-bold text-lg mt-auto pt-2">
          {formatPrice(product.price)}
          <span className="text-xs font-normal text-foreground/50">/kg</span>
        </p>
      </div>
    </motion.div>
  );
}

export function ProductCatalog({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="productos" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-5xl md:text-6xl text-foreground tracking-wide">
            NUESTROS PRODUCTOS
          </h2>
          <p className="mt-4 text-foreground/60 max-w-lg mx-auto">
            Carnes frescas y fiambres seleccionados, todos los días.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium border transition-colors",
              activeCategory === "all"
                ? "bg-primary text-white border-primary"
                : "bg-white text-foreground/70 border-border hover:border-primary hover:text-primary"
            )}
          >
            Todos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium border transition-colors",
                activeCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-foreground/70 border-border hover:border-primary hover:text-primary"
              )}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/50 py-12">
            No hay productos en esta categoría por el momento.
          </p>
        )}

        {/* WhatsApp CTA */}
        <div className="mt-14 text-center">
          <p className="text-foreground/60 mb-4">
            ¿Querés saber precios o disponibilidad? Escribinos.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-2 text-base h-12"
            )}
          >
            <MessageCircle className="w-5 h-5" />
            Consultanos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
