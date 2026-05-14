"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, MessageCircle, ShoppingCart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Contacto", href: "#contacto" },
];

const WA_URL =
  "https://wa.me/542664444019?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20un%20pedido";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Autoservicio El Morro"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label="Ver pedido"
            className="relative p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-white text-primary text-[10px] font-bold flex items-center justify-center leading-none">
                {Math.round(totalItems * 10) / 10}
              </span>
            )}
          </button>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-2"
            )}
          >
            <MessageCircle className="w-4 h-4" />
            Pedí por WhatsApp
          </a>
        </div>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Abrir menú"
                className="md:hidden text-white hover:bg-white/20 hover:text-white"
              />
            }
          >
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72" showCloseButton={false}>
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-8">
                <Image
                  src="/images/logo.png"
                  alt="Autoservicio El Morro"
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium py-3 px-2 rounded-md hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "mt-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-2"
                  )}
                >
                  <MessageCircle className="w-4 h-4" />
                  Pedí por WhatsApp
                </a>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
