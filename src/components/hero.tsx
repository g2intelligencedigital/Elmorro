"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, MapPin, Clock } from "lucide-react";

const WA_URL =
  "https://wa.me/542664444019?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20un%20pedido";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-background pt-12 pb-0 md:pt-20"
    >
      {/* Decorative orange strip */}
      <div className="absolute top-0 left-0 w-2 h-full bg-primary" aria-hidden />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pl-6"
          >
            <Badge
              variant="secondary"
              className="mb-4 text-[#2E3A2E] border-[#FFD7B3] bg-[#FFD7B3] font-medium"
            >
              <MapPin className="w-3 h-3 mr-1" />
              San Luis · Abierto hasta las 11 PM
            </Badge>

            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl leading-none tracking-wide text-foreground mb-4">
              TODO LO QUE
              <br />
              <span className="text-primary">NECESITÁS</span>
              <br />
              A PASOS DE
              <br />
              CASA
            </h1>

            <p className="text-lg text-foreground/70 max-w-md mt-6 leading-relaxed">
              Tu autoservicio de siempre, en el barrio. Carnes frescas, almacén
              completo y ofertas que tienen sentido.
            </p>

            <div className="flex items-center gap-2 mt-4 text-sm text-foreground/60">
              <Clock className="w-4 h-4 text-primary" />
              <span>Abierto todos los días hasta las 11 PM</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
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
                Hacer un pedido
              </a>
              <a
                href="#productos"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-primary text-primary hover:bg-primary hover:text-white text-base h-12"
                )}
              >
                Ver productos
              </a>
            </div>

            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
              <div className="flex -space-x-1">
                {["M", "C", "L", "J"].map((letter) => (
                  <div
                    key={letter}
                    className="w-7 h-7 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-bold text-primary"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                      viewBox="0 0 20 20"
                      aria-hidden
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-foreground/60">
                  4.2 · 329 opiniones en Google
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — store photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/tienda.jpg"
                alt="Interior de Autoservicio El Morro — pasillos con productos"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-white rounded-xl px-4 py-3 shadow-lg">
              <p className="font-heading text-2xl leading-none">+15 AÑOS</p>
              <p className="text-xs mt-0.5 opacity-90">en el barrio</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-16 h-16 bg-primary" aria-hidden />
    </section>
  );
}
