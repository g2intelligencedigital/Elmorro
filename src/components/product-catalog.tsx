"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
  Store,
  Trash2,
  X,
} from "lucide-react";

import { CATEGORY_LABELS, type Category, type Product } from "@/data/products";
import { useCart, type CartItem } from "@/lib/cart-context";

const CATEGORIES: Category[] = ["fiambreria", "carniceria"];
const WA_NUMBER = "542664444019";
const COSTO_ENVIO = 2500; // ARS — costo fijo de envío a domicilio

type PasoCheckout = "carrito" | "checkout";
type MetodoEntrega = "retiro" | "domicilio";

function formatPrice(n: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}

function buildWhatsAppURL(items: CartItem[]) {
  const lines = items.map(
    (i) =>
      `• ${i.product.name}: ${i.quantity} kg — ${formatPrice(i.product.price * i.quantity)}`
  );
  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const msg = [
    "Hola! Me gustaría hacer el siguiente pedido:",
    "",
    ...lines,
    "",
    `Total estimado: ${formatPrice(total)}`,
    "",
    "¡Muchas gracias!",
  ].join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(0.5);

  const dec = () => setQty((q) => Math.max(0.5, Math.round((q - 0.5) * 10) / 10));
  const inc = () => setQty((q) => Math.min(5, Math.round((q + 0.5) * 10) / 10));

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
        <p className="text-xs text-foreground/50 mt-0.5 mb-2">{product.description}</p>
        <p className="text-primary font-bold text-lg mt-auto">
          {formatPrice(product.price)}
          <span className="text-xs font-normal text-foreground/50">/kg</span>
        </p>

        <div className="flex items-center gap-1.5 mt-3">
          <button
            onClick={dec}
            aria-label="Reducir"
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors flex-shrink-0"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm font-medium w-12 text-center tabular-nums">
            {qty} kg
          </span>
          <button
            onClick={inc}
            aria-label="Aumentar"
            className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors flex-shrink-0"
          >
            <Plus className="w-3 h-3" />
          </button>
          <button
            onClick={() => addItem(product, qty)}
            className="flex-1 py-1.5 px-3 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Cart Drawer ───────────────────────────────────────────────────────────────

function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } =
    useCart();

  const [paso, setPaso] = useState<PasoCheckout>("carrito");
  const [metodo, setMetodo] = useState<MetodoEntrega>("retiro");
  const [direccion, setDireccion] = useState("");
  const [procesando, setProcesando] = useState(false);

  // Resetea el flujo de checkout al cerrar el drawer
  useEffect(() => {
    if (!isOpen) {
      setPaso("carrito");
      setMetodo("retiro");
      setDireccion("");
    }
  }, [isOpen]);

  const costoEnvio = metodo === "domicilio" ? COSTO_ENVIO : 0;
  const totalFinal = totalPrice + costoEnvio;
  const puedeConfirmar =
    metodo === "retiro" || (metodo === "domicilio" && direccion.trim().length > 5);

  // Simulación del flujo de Mercado Pago Checkout Pro
  const handlePagarMP = async () => {
    setProcesando(true);

    const pedido = {
      items: items.map((i) => ({
        id: i.product.id,
        title: i.product.name,
        quantity: i.quantity,
        unit_price: i.product.price,
        subtotal: i.product.price * i.quantity,
      })),
      entrega: {
        metodo,
        direccion: metodo === "domicilio" ? direccion : "Retiro en local",
        costo_envio: costoEnvio,
      },
      total_productos: totalPrice,
      total_envio: costoEnvio,
      total_final: totalFinal,
    };

    // === EXPLICACIÓN TÉCNICA DEL FLUJO (mentoring en consola) ===
    console.group("🛒 CHECKOUT — Mercado Pago Checkout Pro");
    console.log("📦 Paso 1: Construir payload del pedido.");
    console.log("  Cada ítem necesita: title, quantity, unit_price, currency_id.");
    console.table(pedido.items);
    console.log("  Entrega:", pedido.entrega);

    console.log(
      "\n📡 Paso 2: Llamada al backend (simulada).",
      "\n  En producción: POST /api/checkout/create-preference",
      "\n  El backend llama a MP con tu ACCESS_TOKEN y devuelve { id, init_point }."
    );
    console.log("  Payload completo:", JSON.stringify(pedido, null, 2));

    // Simula latencia de red
    await new Promise((r) => setTimeout(r, 1200));

    const mockPreferenceId = `MP_PREF_${Date.now()}_SIMULADO`;
    const initPoint = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${mockPreferenceId}`;

    console.log("\n✅ Paso 3: Preferencia creada por Mercado Pago.");
    console.log("  preference_id:", mockPreferenceId);
    console.log("  init_point:", initPoint);
    console.log(
      "\n🔀 Paso 4: Redirigir al usuario al Checkout Pro.",
      "\n  En producción: window.location.href = init_point",
      "\n  MP procesa el pago y redirige al back_url configurado en la preferencia."
    );
    console.groupEnd();

    // En producción → window.location.href = initPoint;
    alert(
      `[SIMULACIÓN]\n\npreference_id generado:\n${mockPreferenceId}\n\nEn producción serías redirigido a:\n${initPoint}`
    );

    setProcesando(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay oscuro */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={closeCart}
            aria-hidden
          />

          {/* Panel lateral */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.32 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col"
            aria-label="Carrito de pedido"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                {paso === "checkout" ? (
                  <button
                    onClick={() => setPaso("carrito")}
                    aria-label="Volver al carrito"
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <ShoppingCart className="w-5 h-5 text-primary" />
                )}
                <h2 className="font-heading text-xl tracking-wide">
                  {paso === "carrito" ? "MI PEDIDO" : "FINALIZAR PEDIDO"}
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Cerrar"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Indicador de pasos */}
            {items.length > 0 && (
              <div className="flex items-center px-5 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      paso === "carrito"
                        ? "bg-primary text-white"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    1
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors ${
                      paso === "carrito" ? "text-foreground" : "text-foreground/50"
                    }`}
                  >
                    Productos
                  </span>
                </div>
                <div className="flex-1 mx-3 h-px bg-border" />
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      paso === "checkout"
                        ? "bg-primary text-white"
                        : "bg-muted text-foreground/40"
                    }`}
                  >
                    2
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors ${
                      paso === "checkout" ? "text-foreground" : "text-foreground/40"
                    }`}
                  >
                    Entrega y pago
                  </span>
                </div>
              </div>
            )}

            {/* Contenido dinámico por paso */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {paso === "carrito" ? (
                  /* ── Paso 1: Lista de productos ── */
                  <motion.div
                    key="vista-carrito"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.18 }}
                    className="px-5 py-4 space-y-4"
                  >
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-48 gap-3 text-foreground/40">
                        <ShoppingCart className="w-10 h-10" />
                        <p className="text-sm">El pedido está vacío</p>
                      </div>
                    ) : (
                      items.map((item) => (
                        <div key={item.product.id} className="flex gap-3 items-start">
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-border">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium leading-snug line-clamp-2">
                              {item.product.name}
                            </p>
                            <p className="text-xs text-foreground/50">
                              {formatPrice(item.product.price)}/kg
                            </p>
                            <div className="flex items-center gap-1.5 mt-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    Math.round((item.quantity - 0.5) * 10) / 10
                                  )
                                }
                                aria-label="Reducir"
                                className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="text-sm font-medium w-10 text-center tabular-nums">
                                {item.quantity} kg
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    Math.round((item.quantity + 0.5) * 10) / 10
                                  )
                                }
                                aria-label="Aumentar"
                                className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                              <span className="ml-auto text-sm font-bold text-primary">
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                aria-label="Eliminar"
                                className="text-foreground/30 hover:text-red-500 transition-colors ml-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </motion.div>
                ) : (
                  /* ── Paso 2: Método de entrega ── */
                  <motion.div
                    key="vista-checkout"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.18 }}
                    className="px-5 py-4 space-y-5"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50 mb-3">
                        Método de entrega
                      </p>

                      <div className="space-y-2">
                        {/* Opción A: Retiro en local */}
                        <label
                          className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            metodo === "retiro"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="metodo-entrega"
                            value="retiro"
                            checked={metodo === "retiro"}
                            onChange={() => setMetodo("retiro")}
                            className="sr-only"
                          />
                          {/* Radio visual personalizado */}
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                              metodo === "retiro" ? "border-primary" : "border-border"
                            }`}
                          >
                            {metodo === "retiro" && (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-semibold flex items-center gap-1.5">
                                <Store className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                Retiro en local
                              </span>
                              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                                Sin cargo
                              </span>
                            </div>
                            <p className="text-xs text-foreground/50 mt-0.5">
                              Coordinamos horario por WhatsApp
                            </p>
                          </div>
                        </label>

                        {/* Opción B: Envío a domicilio */}
                        <label
                          className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            metodo === "domicilio"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="metodo-entrega"
                            value="domicilio"
                            checked={metodo === "domicilio"}
                            onChange={() => setMetodo("domicilio")}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                              metodo === "domicilio"
                                ? "border-primary"
                                : "border-border"
                            }`}
                          >
                            {metodo === "domicilio" && (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-semibold flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                Envío a domicilio
                              </span>
                              <span className="text-xs font-semibold text-foreground/70">
                                {formatPrice(COSTO_ENVIO)}
                              </span>
                            </div>
                            <p className="text-xs text-foreground/50 mt-0.5">
                              Entrega en el día · San Luis capital
                            </p>
                          </div>
                        </label>
                      </div>

                      {/* Input de dirección — solo visible cuando selecciona domicilio */}
                      <AnimatePresence>
                        {metodo === "domicilio" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3">
                              <label
                                htmlFor="direccion"
                                className="text-xs font-medium text-foreground/70 mb-1.5 block"
                              >
                                Dirección de entrega
                              </label>
                              <input
                                id="direccion"
                                type="text"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                placeholder="Ej: Belgrano 456, B° Centro"
                                className="w-full px-3 py-2.5 text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-foreground/30"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Desglose de costos */}
                    <div className="space-y-2 pt-1 border-t border-border">
                      <div className="flex justify-between text-sm text-foreground/60">
                        <span>Subtotal productos</span>
                        <span>{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-foreground/60">
                        <span>Envío</span>
                        <span
                          className={
                            costoEnvio === 0 ? "text-green-600 font-medium" : ""
                          }
                        >
                          {costoEnvio === 0 ? "Sin cargo" : formatPrice(costoEnvio)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                        <span>Total</span>
                        <span className="text-primary">{formatPrice(totalFinal)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer fijo con CTAs */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-border space-y-2.5">
                {paso === "carrito" ? (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground/70">
                        Total estimado
                      </span>
                      <span className="font-bold text-xl text-primary">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>

                    {/* CTA principal: avanza al paso de checkout */}
                    <button
                      onClick={() => setPaso("checkout")}
                      className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-colors text-sm"
                    >
                      Finalizar compra
                    </button>

                    {/* Alternativa rápida por WhatsApp */}
                    <a
                      href={buildWhatsAppURL(items)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 border border-border hover:border-[#25D366] text-foreground/50 hover:text-[#25D366] rounded-xl transition-colors text-xs font-medium"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                        aria-hidden
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      O pedir por WhatsApp
                    </a>

                    <p className="text-xs text-center text-foreground/40">
                      Precios por kg. Total estimado sin delivery.
                    </p>
                  </>
                ) : (
                  <>
                    {/* CTA principal: pagar con Mercado Pago */}
                    <button
                      onClick={handlePagarMP}
                      disabled={!puedeConfirmar || procesando}
                      className="w-full py-3.5 bg-[#009EE3] hover:bg-[#0087c9] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      {procesando ? (
                        <>
                          <svg
                            className="animate-spin w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Procesando...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          Pagar con Mercado Pago
                        </>
                      )}
                    </button>

                    {/* Aviso si falta dirección */}
                    {metodo === "domicilio" && !puedeConfirmar && (
                      <p className="text-xs text-center text-amber-600 font-medium">
                        Ingresá tu dirección de entrega para continuar
                      </p>
                    )}

                    <p className="text-xs text-center text-foreground/40">
                      Pago seguro procesado por Mercado Pago
                    </p>
                  </>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────

export function ProductCatalog({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("fiambreria");
  const filtered = products.filter((p) => p.category === activeCategory);

  return (
    <section id="productos" className="bg-[#F4F2EE] py-20">
      <CartDrawer />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
            Frescos todos los días
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground tracking-wide">
            NUESTRO CATÁLOGO
          </h2>
          <p className="text-foreground/60 mt-3 max-w-sm mx-auto text-sm">
            Elegí lo que querés y coordinamos la entrega por WhatsApp.
          </p>
        </motion.div>

        {/* Filtros por categoría */}
        <div className="flex gap-2 justify-center mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-foreground/60 border border-border hover:border-primary hover:text-primary"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Grilla de productos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
