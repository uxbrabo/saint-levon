"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Container, Section } from "@/components/layout/Container";
import { useCart } from "@/context/CartProvider";
import { formatPrice, picsumUrl } from "@/lib/products";
import { ShieldIcon } from "@/components/icons";

const FREE_SHIPPING_THRESHOLD = 350;
const SHIPPING_COST = 29.9;

export function CheckoutFlow() {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const formId = useId();
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderNumber(`SL-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <main>
        <Section ariaLabel="Pedido confirmado" className="bg-bg transition-colors duration-300">
          <Container className="flex flex-col items-center py-12 text-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-line text-fg"
            >
              <ShieldIcon className="h-8 w-8" />
            </motion.div>
            <h1 className="font-display mt-6 text-4xl text-fg md:text-5xl">Pedido confirmado</h1>
            <p className="text-body mt-4 max-w-md text-secondary">
              Recebemos seu pedido <strong className="text-fg">{orderNumber}</strong>. Você vai
              receber um e-mail com os detalhes de envio em instantes.
            </p>
            <Link
              href="/"
              className="text-cta mt-8 inline-flex items-center rounded-full bg-accent px-8 py-4 text-accent-fg transition-opacity duration-200 hover:opacity-85"
            >
              Voltar à loja
            </Link>
          </Container>
        </Section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main>
        <Section ariaLabel="Carrinho vazio" className="bg-bg transition-colors duration-300">
          <Container className="flex flex-col items-center py-12 text-center">
            <h1 className="font-display text-4xl text-fg md:text-5xl">Seu carrinho está vazio</h1>
            <p className="text-body mt-4 max-w-md text-secondary">
              Adicione produtos ao carrinho antes de finalizar a compra.
            </p>
            <Link
              href="/#catalogo"
              className="text-cta mt-8 inline-flex items-center rounded-full bg-accent px-8 py-4 text-accent-fg transition-opacity duration-200 hover:opacity-85"
            >
              Ver catálogo
            </Link>
          </Container>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <Section ariaLabel="Checkout" className="bg-bg transition-colors duration-300">
        <Container>
          <h1 className="text-section text-fg">Finalizar compra</h1>

          <div className="mt-10 flex flex-col gap-12 lg:flex-row lg:items-start">
            <form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-8 lg:w-[60%]">
              <fieldset className="flex flex-col gap-4">
                <legend className="text-label mb-2 text-secondary">Dados de contato</legend>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Nome completo" id="nome" type="text" autoComplete="name" />
                  <Field label="E-mail" id="email" type="email" autoComplete="email" />
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-4">
                <legend className="text-label mb-2 text-secondary">Endereço de entrega</legend>
                <Field label="Endereço" id="endereco" type="text" autoComplete="street-address" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field label="Cidade" id="cidade" type="text" autoComplete="address-level2" />
                  <Field label="Estado" id="estado" type="text" autoComplete="address-level1" />
                  <Field label="CEP" id="cep" type="text" autoComplete="postal-code" />
                </div>
              </fieldset>

              <fieldset className="flex flex-col gap-4">
                <legend className="text-label mb-2 text-secondary">Pagamento</legend>
                <div className="flex flex-wrap gap-3">
                  {["Pix", "Cartão de crédito", "Boleto"].map((method, i) => (
                    <label
                      key={method}
                      className="text-body flex cursor-pointer items-center gap-2 rounded-full border border-line px-5 py-2.5 text-fg has-checked:border-accent has-checked:text-fg"
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        defaultChecked={i === 0}
                        className="accent-accent"
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </fieldset>
            </form>

            <div className="rounded-3xl border border-line bg-surface p-6 lg:w-[40%]">
              <h2 className="font-display text-xl text-fg">Resumo do pedido</h2>

              <ul className="mt-5 flex flex-col gap-4">
                {items.map((line) => (
                  <li key={line.lineId} className="flex items-center gap-4">
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-bg">
                      <Image
                        src={line.image ?? picsumUrl(line.seed, 160, 200)}
                        alt={line.name}
                        fill
                        sizes="56px"
                        className="object-cover grayscale"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-body text-sm text-fg">{line.name}</p>
                      <p className="text-label text-secondary">
                        Tam. {line.size} · Qtd. {line.quantity}
                      </p>
                    </div>
                    <span className="text-body text-sm text-fg">
                      {formatPrice(line.price * line.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2 border-t border-line pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-body text-sm text-secondary">Subtotal</span>
                  <span className="text-body text-sm text-fg">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body text-sm text-secondary">Frete</span>
                  <span className="text-body text-sm text-fg">
                    {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-line pt-3">
                  <span className="text-body font-medium text-fg">Total</span>
                  <span className="text-price text-fg">{formatPrice(total)}</span>
                </div>
              </div>

              <motion.button
                type="submit"
                form={formId}
                whileTap={{ scale: 0.97 }}
                className="text-cta mt-6 w-full rounded-full bg-accent px-7 py-3.5 text-accent-fg transition-opacity duration-200 hover:opacity-85"
              >
                Confirmar pedido
              </motion.button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}

function Field({
  label,
  id,
  type,
  autoComplete,
}: {
  label: string;
  id: string;
  type: string;
  autoComplete: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-label text-secondary">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required
        className="text-body rounded-xl border border-line bg-surface px-4 py-3 text-fg"
      />
    </div>
  );
}
