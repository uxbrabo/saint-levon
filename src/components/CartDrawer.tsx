"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/context/CartProvider";
import { formatPrice, picsumUrl } from "@/lib/products";
import { CartIcon } from "@/components/icons";

export function CartDrawer() {
  const { items, isOpen, close, subtotal, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[90] bg-black/40"
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho de compras"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[100] flex w-full max-w-md flex-col bg-surface text-fg shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-xl text-fg">Seu carrinho</h2>
              <button
                type="button"
                onClick={close}
                aria-label="Fechar carrinho"
                className="flex h-9 w-9 items-center justify-center rounded-full text-fg transition-colors duration-200 hover:bg-bg"
              >
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <CartIcon className="h-10 w-10 text-secondary" />
                <p className="text-body text-secondary">Seu carrinho está vazio.</p>
                <Link
                  href="/#catalogo"
                  onClick={close}
                  className="text-cta rounded-full bg-accent px-6 py-3 text-accent-fg transition-opacity duration-200 hover:opacity-85"
                >
                  Ver catálogo
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 py-4">
                  {items.map((line) => (
                    <li key={line.lineId} className="flex gap-4 border-b border-line py-5 first:pt-0">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-bg">
                        <Image
                          src={line.image ?? picsumUrl(line.seed, 200, 240)}
                          alt={line.name}
                          fill
                          sizes="80px"
                          className="object-cover grayscale"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-display text-base text-fg">{line.name}</p>
                          <button
                            type="button"
                            onClick={() => removeItem(line.lineId)}
                            aria-label={`Remover ${line.name} do carrinho`}
                            className="text-label shrink-0 text-secondary transition-colors duration-200 hover:text-fg"
                          >
                            Remover
                          </button>
                        </div>
                        <p className="text-label mt-1 text-secondary">Tamanho {line.size}</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-3 rounded-full border border-line px-3 py-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
                              aria-label={`Diminuir quantidade de ${line.name}`}
                              className="text-fg transition-colors duration-200 hover:text-secondary"
                            >
                              −
                            </button>
                            <span className="text-body w-4 text-center text-sm">{line.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(line.lineId, line.quantity + 1)}
                              aria-label={`Aumentar quantidade de ${line.name}`}
                              className="text-fg transition-colors duration-200 hover:text-secondary"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-price text-fg">{formatPrice(line.price * line.quantity)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-line px-6 py-6">
                  <div className="flex items-center justify-between">
                    <span className="text-body text-secondary">Subtotal</span>
                    <span className="text-price text-fg">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-label mt-1 text-secondary">Frete e impostos calculados no checkout.</p>
                  <Link
                    href="/checkout"
                    onClick={close}
                    className="text-cta mt-5 flex w-full items-center justify-center rounded-full bg-accent px-7 py-3.5 text-accent-fg transition-opacity duration-200 hover:opacity-85"
                  >
                    Finalizar compra
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
