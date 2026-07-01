import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Entrega e Envio — SAINT LEVON",
  description: "Tudo sobre prazos, frete grátis e formas de envio da SAINT LEVON.",
};

export default function EntregaPage() {
  return (
    <main>
      <Section ariaLabel="Entrega e Envio" className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container className="max-w-3xl">
          <span className="text-label text-secondary">Logística</span>
          <h1 className="font-display mt-3 text-4xl font-black uppercase tracking-tight text-fg md:text-5xl">
            Entrega e Envio
          </h1>
          <p className="text-body mt-6 text-secondary">
            Toda compra é embalada com cuidado em Recife e despachada em até 2 dias úteis após a confirmação do pagamento.
          </p>

          <div className="mt-12 flex flex-col gap-px overflow-hidden rounded-3xl border border-line">
            {[
              { titulo: "Frete grátis", descricao: "Para compras acima de R$ 350 em todo o Brasil." },
              { titulo: "PAC (Econômico)", descricao: "Para compras abaixo de R$ 350. Prazo de 5 a 12 dias úteis. Custo calculado pelo CEP no checkout." },
              { titulo: "SEDEX (Expresso)", descricao: "Prazo de 2 a 5 dias úteis. Disponível para todo o Brasil. Custo calculado no checkout." },
              { titulo: "Retirada em Recife", descricao: "Disponível para clientes da região metropolitana. Entre em contato pelo WhatsApp para combinar." },
            ].map(({ titulo, descricao }) => (
              <div key={titulo} className="bg-surface px-8 py-6">
                <h2 className="font-display text-lg font-bold uppercase text-fg">{titulo}</h2>
                <p className="text-body mt-2 text-secondary">{descricao}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold uppercase text-fg">Rastreamento</h2>
            <p className="text-body mt-4 text-secondary">
              Assim que seu pedido for despachado, você recebe um e-mail com o código de rastreamento dos Correios. Acompanhe em{" "}
              <a href="https://rastreamento.correios.com.br" target="_blank" rel="noopener noreferrer" className="text-fg underline underline-offset-4">
                correios.com.br
              </a>
              .
            </p>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold uppercase text-fg">Regiões atendidas</h2>
            <p className="text-body mt-4 text-secondary">
              Enviamos para todo o território nacional. Para pedidos internacionais, entre em contato pelo WhatsApp antes de finalizar a compra.
            </p>
          </div>

          <div className="mt-12 rounded-3xl bg-surface border border-line p-8">
            <h2 className="font-display text-xl font-bold uppercase text-fg">Dúvidas sobre sua entrega?</h2>
            <p className="text-body mt-3 text-secondary">Fale com a gente — respondemos no mesmo dia (segunda a sábado, 9h–21h).</p>
            <a
              href="https://wa.me/5581989056181"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cta mt-5 inline-flex rounded-full bg-accent px-7 py-3.5 text-accent-fg transition-opacity hover:opacity-85"
            >
              WhatsApp (81) 98905-6181
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}
