"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Contacto", href: "#contacto" },
];

const WA_URL =
  "https://wa.me/542664444019?text=Hola%2C%20quer%C3%ADa%20consultar%20algo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={cn(
          "mx-auto transition-all duration-300",
          scrolled
            ? "max-w-4xl mt-2 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-md px-5"
            : "max-w-6xl bg-white border-b border-gray-100 shadow-sm px-6"
        )}
      >
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 shrink-0" aria-label="Autoservicio El Morro — inicio">
            <Image
              src="/images/logo.png"
              alt="Autoservicio El Morro"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
              priority
            />
          </a>

          {/* Desktop nav — centered absolute */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#F36C21] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden md:inline-flex bg-[#25D366] hover:bg-[#1ebe5d] text-white gap-1.5 shrink-0"
            )}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Abrir menú"
                  className="md:hidden text-gray-700 hover:bg-gray-100"
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
                      className="text-base font-medium py-3 px-2 rounded-md hover:bg-gray-50 transition-colors text-gray-700"
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
                    Consultanos por WhatsApp
                  </a>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
