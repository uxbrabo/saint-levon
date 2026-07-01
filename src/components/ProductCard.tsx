"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { HeartIcon, StarIcon } from "@/components/icons";
import { useTilt } from "@/hooks/useTilt";
import { formatPrice, productImage, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const [saved, setSaved] = useState(false);
  const { ref: tiltRef, style: tiltStyle, onMouseMove, onMouseLeave } = useTilt<HTMLElement>(6);

  return (
    <motion.article
      ref={tiltRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ ...tiltStyle, transformStyle: "preserve-3d" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex w-full flex-col rounded-2xl border border-line bg-surface p-4 shadow-sm transition-colors duration-300 hover:shadow-md"
    >
      <motion.button
        type="button"
        whileTap={{ scale: 0.8 }}
        onClick={() => setSaved((prev) => !prev)}
        aria-pressed={saved}
        aria-label={saved ? `Remover ${product.name} dos favoritos` : `Salvar ${product.name} nos favoritos`}
        className="absolute right-7 top-7 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-fg transition-colors duration-200 hover:text-accent"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={saved ? "saved" : "unsaved"}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex"
          >
            <HeartIcon className="h-4 w-4" filled={saved} />
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <Link href={`/produto/${product.id}`} className="group flex flex-col">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-bg">
          {product.badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`text-label absolute left-3 top-3 z-10 rounded-full px-3 py-1 ${
                product.badge === "novo" ? "bg-line text-fg" : "bg-accent text-accent-fg"
              }`}
            >
              {product.badge === "novo" ? "Novidade" : "Oferta"}
            </motion.span>
          )}
          <Image
            src={productImage(product, 600, 600)}
            alt={product.alt}
            fill
            sizes="(min-width: 1024px) 18vw, 60vw"
            className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
          />
        </div>

        <h3 className="font-display mt-4 text-base text-fg">{product.name}</h3>
        <p className="text-label mt-1 text-secondary">{product.category}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-price text-fg">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-body text-sm text-secondary line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <StarIcon className="h-3.5 w-3.5 text-accent" />
            <span className="text-label">{product.rating}</span>
          </div>
        </div>

        <p className="text-label mt-3 text-secondary">Tamanhos {product.sizeRange}</p>
      </Link>
    </motion.article>
  );
}
