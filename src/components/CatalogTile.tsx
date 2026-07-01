"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { HeartIcon, StarIcon, ArrowRight } from "@/components/icons";
import { formatPrice, productImage, type Product } from "@/lib/products";

export function CatalogTile({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-3xl bg-surface ${className}`}
    >
      <motion.button
        type="button"
        whileTap={{ scale: 0.8 }}
        onClick={() => setSaved((prev) => !prev)}
        aria-pressed={saved}
        aria-label={saved ? `Remover ${product.name} dos favoritos` : `Salvar ${product.name} nos favoritos`}
        className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors duration-200 hover:text-white/70"
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

      <Link href={`/produto/${product.id}`} className="block h-full w-full">
        <motion.div initial="rest" whileHover="hover" animate="rest" className="group relative h-full w-full">
          {product.badge && (
            <span
              className={`text-label absolute left-4 top-4 z-10 rounded-full px-3 py-1 ${
                product.badge === "novo" ? "bg-white text-[#0a0a0a]" : "bg-[#0a0a0a] text-white"
              }`}
            >
              {product.badge === "novo" ? "Novidade" : "Oferta"}
            </span>
          )}

          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={productImage(product, 800, 800)}
              alt={product.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
            <div className="min-w-0">
              <p className="text-label text-white/70">{product.category}</p>
              <h3 className="font-display mt-1 truncate text-lg text-white">{product.name}</h3>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-price text-white">{formatPrice(product.price)}</span>
                <span className="flex items-center gap-1 text-white/80">
                  <StarIcon className="h-3 w-3 text-white" />
                  <span className="text-label">{product.rating}</span>
                </span>
              </div>
            </div>

            <motion.span
              variants={{ rest: { x: 0, opacity: 0.7 }, hover: { x: 4, opacity: 1 } }}
              transition={{ duration: 0.3 }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0a0a0a]"
              aria-hidden="true"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
