"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, MessageCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";

const WA_URL =
  "https://wa.me/542664444019?text=Hola%2C%20quer%C3%ADa%20consultar%20algo";

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring" as const, bounce: 0.3, duration: 1.5 },
    },
  },
};

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/tienda.jpg"
          alt="Interior Autoservicio El Morro"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#2E3A2E]/75" />
      </div>

      {/* Radial fade at bottom */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background:radial-gradient(120%_80%_at_50%_100%,transparent_0%,#2E3A2E_80%)]"
      />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 text-center">
        <AnimatedGroup
          variants={{
            container: {
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            },
            ...transitionVariants,
          }}
          className="flex flex-col items-center gap-6"
        >
          {/* Location pill */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/90 w-fit">
            <MapPin className="w-3.5 h-3.5 text-[#F36C21]" />
            <span>Autoservicio El Morro, San Luis</span>
            <span className="w-px h-3.5 bg-white/30" />
            <Clock className="w-3.5 h-3.5 text-[#F36C21]" />
            <span>Hasta las 11 PM</span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl xl:text-9xl leading-none tracking-wide text-white text-balance">
            TODO LO QUE{" "}
            <span className="text-[#F36C21]">NECESITÁS</span>
            {" "}A PASOS DE CASA
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed text-balance">
            Tu autoservicio de siempre, en el barrio. Carnes frescas, almacén
            completo y precios que tienen sentido.
          </p>

          {/* Stars */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20" aria-hidden>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white/60 text-sm">4.2 · 329 opiniones en Google</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-2 text-base h-12 px-6"
              )}
            >
              <MessageCircle className="w-5 h-5" />
              Consultanos por WhatsApp
            </a>
            <a
              href="#productos"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/40 text-white hover:bg-white/10 hover:text-white text-base h-12 px-6 backdrop-blur-sm"
              )}
            >
              Ver productos
            </a>
          </div>
        </AnimatedGroup>
      </div>

      {/* Bottom orange bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#F36C21]" aria-hidden />
    </section>
  );
}
