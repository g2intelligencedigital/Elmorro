"use client";

import { motion } from "framer-motion";
import { ShoppingBasket, Tag, Bike } from "lucide-react";

const features = [
  {
    icon: ShoppingBasket,
    title: "Variedad completa",
    description:
      "Desde la yerba hasta el corte de carne. Almacén, fiambrería, bebidas, lácteos y mucho más bajo un mismo techo.",
  },
  {
    icon: Tag,
    title: "Ofertas de verdad",
    description:
      "Precios que tienen sentido para el bolsillo familiar. Promos semanales y liquidaciones que realmente valen la pena.",
  },
  {
    icon: Bike,
    title: "Entrega a domicilio",
    description:
      "¿No podés venir? Escribinos por WhatsApp y coordinamos la entrega. Rápido y sin vueltas.",
  },
];

export function Features() {
  return (
    <section id="por-que-nosotros" className="bg-primary py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-white tracking-wide">
            ¿POR QUÉ EL MORRO?
          </h2>
          <p className="text-white/80 mt-3 text-base max-w-xl mx-auto">
            No somos el super más grande. Somos el más cercano.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.1,
                }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading text-2xl text-white tracking-wide mb-2">
                  {feature.title.toUpperCase()}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
