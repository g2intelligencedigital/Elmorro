"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MessageCircle, MapPin, Phone, Clock } from "lucide-react";

const WA_URL =
  "https://wa.me/542664444019?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20un%20pedido";

const contactInfo = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Av. Cristo Rey Mza. 464 Casa 26, San Luis",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "0266 444-4019",
    href: "tel:+542664444019",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Abierto todos los días · Cierra a las 11 PM",
  },
];

export function Contact() {
  return (
    <section id="contacto" className="bg-background py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              Encontranos
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground tracking-wide mb-6">
              ESTAMOS
              <br />
              <span className="text-primary">CERCA</span>
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-8">
              Pasá a vernos o escribinos antes de venir. Si querés, coordinamos
              la entrega a tu casa sin costo adicional en el barrio.
            </p>

            <ul className="space-y-5 mb-8">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground font-medium hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium">{item.value}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-2 text-base h-12 w-full sm:w-auto inline-flex"
              )}
            >
              <MessageCircle className="w-5 h-5" />
              Escribinos por WhatsApp
            </a>
          </motion.div>

          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="rounded-2xl overflow-hidden shadow-xl h-80 lg:h-96 border border-border"
          >
            <iframe
              title="Ubicación de Autoservicio El Morro en Google Maps"
              src="https://maps.google.com/maps?q=-33.2819553,-66.3000769&z=17&hl=es&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
