"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "María G.",
    rating: 5,
    text: "Muy buen local, tienen de todo y atienden muy bien. Los precios son más que razonables para el barrio.",
    initials: "MG",
  },
  {
    name: "Carlos R.",
    rating: 5,
    text: "El mejor autoservicio del barrio. La fiambrería es excelente y siempre está todo fresco. Voy hace años.",
    initials: "CR",
  },
  {
    name: "Laura M.",
    rating: 4,
    text: "Buena atención y cómodo para hacer las compras del mes. Siempre encuentro lo que busco. Muy recomendable.",
    initials: "LM",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= count ? "text-amber-500 fill-amber-500" : "text-gray-200 fill-gray-200"}`}
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="opiniones" className="bg-muted/50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-foreground tracking-wide mb-3">
            LO QUE DICE EL BARRIO
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <StarRating count={4} />
            <span className="text-foreground font-bold text-lg">4.2</span>
            <span className="text-foreground/60 text-sm">329 opiniones en Google</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1,
              }}
            >
              <Card className="h-full border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col gap-4 h-full">
                  <StarRating count={review.rating} />
                  <p className="text-foreground/70 text-sm leading-relaxed flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                      {review.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{review.name}</p>
                      <p className="text-xs text-foreground/50">Google Reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
