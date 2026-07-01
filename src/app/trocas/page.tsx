import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Trocas e Devoluções — SAINT LEVON",
  description: "Política completa de trocas e devoluções da SAINT LEVON. 14 dias, sem complicação.",
};

const PASSOS = [
  { num: "01", titulo: "Solicite a troca", descricao: "Envie uma mensagem pelo WhatsApp ou e-mail com seu número de pedido e o motivo da troca. Você tem 14 dias corridos a partir do recebimento." },
  { num: "02", titulo: "Aguarde nossa confirmação", descricao: "Em até 24 horas, respondemos com as instruções de envio e, quando aplicável, o código de postagem grátis nos Correios." },
  { num: "03", titulo: "Envie o produto", descricao: "Embale o produto sem uso, com etiquetas, na embalagem original (quando possível). Entregue nos Correios usando o código fornecido." },
  { num: "04", titulo: "Receba o novo produto", descricao: "Após recebermos e validarmos o produto, despachamos o novo em até 3 dias úteis — ou processamos o estorno em até 5 dias úteis." },
];

export default function TrocasPage() {
  return (
    <main>
      <Section ariaLabel="Trocas e Devoluções" className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container className="max-w-3xl">
          <span className="text-label text-secondary">Política</span>
          <h1 className="font-display mt-3 text-4xl font-black uppercase tracking-tight text-fg md:text-5xl">
            Trocas e Devoluções
          </h1>
          <p className="text-body mt-6 text-secondary">
            14 dias. Sem burocracia. Porque queremos que você fique com o que ama.
          </p>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold uppercase text-fg">Como funciona</h2>
            <div className="mt-8 flex flex-col gap-6">
              {PASSOS.map(({ num, titulo, descricao }) => (
                <div key={num} className="flex gap-6">
                  <span className="font-display text-3xl font-black text-secondary">{num}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase text-fg">{titulo}</h3>
                    <p className="text-body mt-2 text-secondary">{descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold uppercase text-fg">Condições</h2>
            <div className="mt-6 flex flex-col gap-px overflow-hidden rounded-3xl border border-line">
              {[
                { ok: true, texto: "Produto sem uso, com etiqueta e na embalagem original" },
                { ok: true, texto: "Solicitação feita em até 14 dias corridos após o recebimento" },
                { ok: true, texto: "Defeito de fabricação: troca ou estorno em qualquer prazo" },
                { ok: false, texto: "Produtos lavados, usados ou com marcas de uso" },
                { ok: false, texto: "Itens de liquidação com desconto acima de 50%" },
                { ok: false, texto: "Peças personalizadas ou sob encomenda" },
              ].map(({ ok, texto }) => (
                <div key={texto} className="flex items-start gap-4 bg-surface px-6 py-4">
                  <span className={`mt-0.5 text-sm font-bold ${ok ? "text-fg" : "text-secondary"}`}>
                    {ok ? "✓" : "✕"}
                  </span>
                  <p className="text-body text-sm text-fg">{texto}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold uppercase text-fg">Estorno</h2>
            <p className="text-body mt-4 text-secondary">
              Para compras no cartão de crédito, o estorno aparece na fatura em até 2 ciclos de cobrança. Para Pix e boleto, o reembolso é feito por transferência em até 5 dias úteis após a validação do produto devolvido.
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-line bg-surface p-8">
            <h2 className="font-display text-xl font-bold uppercase text-fg">Quer iniciar uma troca?</h2>
            <div className="mt-5 flex flex-wrap gap-4">
              <a
                href="https://wa.me/5581989056181"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cta inline-flex rounded-full bg-accent px-7 py-3.5 text-accent-fg transition-opacity hover:opacity-85"
              >
                WhatsApp
              </a>
              <a
                href="mailto:contato@saintlevon.com.br"
                className="text-cta inline-flex rounded-full border border-line px-7 py-3.5 text-fg transition-colors hover:border-fg"
              >
                contato@saintlevon.com.br
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
