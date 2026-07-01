"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Container, Section } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProductCard } from "@/components/ProductCard";
import { StarIcon, TruckIcon, ReturnIcon, ShieldIcon } from "@/components/icons";
import { useCart } from "@/context/CartProvider";
import {
  formatPrice,
  getRelatedProducts,
  productImage,
  type Product,
} from "@/lib/products";

const TRUST_ROW = [
  { icon: TruckIcon, label: "Frete grátis acima de R$ 350" },
  { icon: ReturnIcon, label: "Troca garantida em 14 dias" },
  { icon: ShieldIcon, label: "Produto original SAINT LEVON" },
];

export function ProductDetail({ product }: { product: Product }) {
  const sizeGroupId = useId();
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const related = getRelatedProducts(product);

  const handleAddToCart = () => {
    if (!size) return;
    addItem(product, size, quantity);
  };

  return (
    <main>
      <Section ariaLabel={product.name} className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container>
          <nav aria-label="Trilha de navegação" className="text-label flex min-w-0 items-center gap-2 text-secondary">
            <Link href="/" className="shrink-0 transition-colors duration-200 hover:text-fg">
              Início
            </Link>
            <span aria-hidden="true" className="shrink-0">/</span>
            <Link href="/catalogo" className="shrink-0 transition-colors duration-200 hover:text-fg">
              Catálogo
            </Link>
            <span aria-hidden="true" className="shrink-0">/</span>
            <span className="truncate text-fg">{product.name}</span>
          </nav>

          <div className="mt-8 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
            <ScrollReveal direction="left" threshold={0.2} className="lg:w-[60%]">
              <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-surface">
                {product.badge && (
                  <span
                    className={`text-label absolute left-5 top-5 z-10 rounded-full px-3 py-1 ${
                      product.badge === "novo" ? "bg-white text-[#0a0a0a]" : "bg-[#0a0a0a] text-white"
                    }`}
                  >
                    {product.badge === "novo" ? "Novidade" : "Oferta"}
                  </span>
                )}
                <Image
                  src={productImage(product, 1200, 1500)}
                  alt={product.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" threshold={0.2} className="lg:w-[40%]">
              <span className="text-label text-secondary">{product.category}</span>
              <h1 className="font-display mt-2 text-4xl text-fg md:text-5xl">{product.name}</h1>

              <div className="mt-3 flex items-center gap-2">
                <StarIcon className="h-4 w-4 text-accent" />
                <span className="text-body text-sm text-fg">{product.rating}</span>
                <span className="text-label text-secondary">· avaliações de clientes</span>
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-price text-fg">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-body text-secondary line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              <p className="text-body mt-5 text-secondary">{product.description}</p>
              <p className="text-label mt-3 text-secondary normal-case tracking-normal">
                Material: {product.material}
              </p>

              <fieldset className="mt-8">
                <legend id={sizeGroupId} className="text-label text-secondary">
                  Tamanho
                </legend>
                <div className="mt-4 flex flex-wrap gap-3" role="group" aria-labelledby={sizeGroupId}>
                  {product.sizes.map((s) => {
                    const selected = size === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setSize(s)}
                        className={`text-cta h-12 min-w-12 rounded-full border px-4 transition-colors duration-200 ${
                          selected
                            ? "border-accent bg-accent text-accent-fg"
                            : "border-line text-fg hover:border-fg"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-6 flex items-center gap-4">
                <span className="text-label text-secondary">Quantidade</span>
                <div className="flex items-center gap-4 rounded-full border border-line px-4 py-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Diminuir quantidade"
                    className="text-fg transition-colors duration-200 hover:text-secondary"
                  >
                    −
                  </button>
                  <span className="text-body w-4 text-center text-sm">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Aumentar quantidade"
                    className="text-fg transition-colors duration-200 hover:text-secondary"
                  >
                    +
                  </button>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={handleAddToCart}
                disabled={!size}
                whileTap={{ scale: 0.97 }}
                className="text-cta mt-8 w-full rounded-full bg-accent px-8 py-4 text-accent-fg transition-opacity duration-200 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Adicionar ao carrinho
              </motion.button>
              {!size && (
                <p className="text-label mt-3 text-secondary">Selecione um tamanho pra continuar</p>
              )}

              <ul className="mt-8 flex flex-col gap-3 border-t border-line pt-6">
                {TRUST_ROW.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0 text-accent" />
                    <span className="text-body text-sm text-secondary">{label}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section ariaLabel="Você também pode gostar" topPad={false} className="bg-bg transition-colors duration-300">
          <Container>
            <ScrollReveal direction="up" threshold={0.2}>
              <span className="text-label text-secondary">Combina com</span>
              <h2 className="text-section mt-2 text-fg">Você também pode gostar</h2>
            </ScrollReveal>

            <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {related.map((item, i) => (
                <ScrollReveal key={item.id} direction="up" threshold={0.2} delay={i * 80}>
                  <ProductCard product={item} />
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </main>
  );
}
