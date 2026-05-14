"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Fiambrería y carnicería propias",
  "Productos de almacén al por mayor",
  "Sección de lácteos y frescos",
  "Bebidas y gaseosas con variedad",
  "Artículos de limpieza e higiene",
];

export function StoreSection() {
  return (
    <section id="nosotros" className="bg-background py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="/images/fiambres.jpg"
                alt="Mostrador de fiambrería y carnicería de El Morro"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary/10 -z-10"
              aria-hidden
            />
            <div
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-accent/20 -z-10"
              aria-hidden
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              La tienda
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground tracking-wide mb-4">
              FRESCURA · CALIDAD
              <br />
              CONFIANZA
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-6">
              Llevamos años siendo el autoservicio del barrio. No cambiamos
              porque no hace falta. Sabemos lo que la gente necesita: buen
              producto, precio justo y que te traten bien.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-8">
              La fiambrería es nuestra especialidad. Cortes propios, embutidos
              seleccionados, y atención de la que te acordás.
            </p>

            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/80 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
