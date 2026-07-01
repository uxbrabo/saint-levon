import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Perguntas Frequentes — SAINT LEVON",
  description: "Dúvidas sobre pedidos, pagamento, tamanhos, trocas e o programa de fidelidade da SAINT LEVON.",
};

const FAQ = [
  {
    categoria: "Pedidos e pagamento",
    perguntas: [
      { p: "Quais formas de pagamento vocês aceitam?", r: "Aceitamos Pix (com 5% de desconto), cartão de crédito em até 12× sem juros e boleto bancário." },
      { p: "Meu pedido foi confirmado. Quando ele sai?", r: "Em até 2 dias úteis após a confirmação do pagamento. Para Pix, a confirmação é imediata." },
      { p: "Posso cancelar um pedido?", r: "Pedidos podem ser cancelados em até 2 horas após a finalização, antes de entrar no processo de separação. Após esse prazo, o produto já está sendo embalado." },
      { p: "Meu pedido não chegou no prazo. O que faço?", r: "Verifique o rastreamento pelo código que enviamos por e-mail. Se houver atraso superior a 3 dias além do prazo estimado, entre em contato pelo WhatsApp." },
    ],
  },
  {
    categoria: "Tamanhos e produto",
    perguntas: [
      { p: "Como escolho meu tamanho?", r: "Cada produto tem uma tabela de medidas na página interna. Em caso de dúvida entre dois tamanhos, recomendamos o maior para peças de surf (mais conforto de movimento) e o menor para streetwear (caimento mais estruturado)." },
      { p: "As fotos representam a cor real?", r: "Todas as fotos são feitas com as peças reais, sem filtros de cor. Pode existir leve variação dependendo da calibração do seu monitor." },
      { p: "Os produtos têm garantia de qualidade?", r: "Sim. Qualquer defeito de fabricação coberto pela garantia de 90 dias — independente do prazo de devolução. Basta nos contatar." },
    ],
  },
  {
    categoria: "Frete e entrega",
    perguntas: [
      { p: "Frete grátis para todo o Brasil?", r: "Frete grátis para compras acima de R$ 350. Abaixo disso, o valor é calculado pelo CEP no checkout." },
      { p: "Vocês enviam para fora do Brasil?", r: "Por enquanto, atendemos apenas o território nacional. Para pedidos internacionais, entre em contato pelo WhatsApp antes de finalizar." },
      { p: "Posso rastrear meu pedido?", r: "Sim. Você recebe o código de rastreamento por e-mail assim que o pedido é despachado. O rastreamento funciona no site dos Correios." },
    ],
  },
  {
    categoria: "Trocas e devoluções",
    perguntas: [
      { p: "Quantos dias tenho para trocar?", r: "14 dias corridos a partir do recebimento do produto. Veja todos os detalhes na nossa página de trocas." },
      { p: "O frete da troca é cobrado?", r: "Para trocas por defeito de fabricação, o frete de volta é por nossa conta. Para trocas por tamanho ou preferência, o frete de envio de volta é por conta do cliente." },
      { p: "Posso devolver e receber o dinheiro de volta?", r: "Sim. Para devoluções dentro do prazo legal (7 dias) ou por defeito, realizamos o estorno total em até 5 dias úteis." },
    ],
  },
];

export default function FaqPage() {
  return (
    <main>
      <Section ariaLabel="Perguntas Frequentes" className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container>
          <div className="max-w-2xl">
            <span className="text-label text-secondary">Suporte</span>
            <h1 className="font-display mt-3 text-4xl font-black uppercase tracking-tight text-fg md:text-5xl">
              Perguntas Frequentes
            </h1>
            <p className="text-body mt-6 text-secondary">
              Não encontrou sua resposta? Fale diretamente com a gente pelo{" "}
              <a href="https://wa.me/5581989056181" className="text-fg underline underline-offset-4">
                WhatsApp
              </a>
              .
            </p>
          </div>

          <div className="mt-16 flex flex-col gap-12">
            {FAQ.map(({ categoria, perguntas }) => (
              <div key={categoria}>
                <h2 className="font-display text-xl font-bold uppercase text-fg border-b border-line pb-4">
                  {categoria}
                </h2>
                <div className="mt-4 flex flex-col gap-px overflow-hidden rounded-3xl border border-line">
                  {perguntas.map(({ p, r }) => (
                    <div key={p} className="bg-surface px-8 py-6">
                      <h3 className="font-display text-base font-bold uppercase text-fg">{p}</h3>
                      <p className="text-body mt-2 text-secondary">{r}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border border-line bg-surface p-8">
            <h2 className="font-display text-xl font-bold uppercase text-fg">Ainda com dúvidas?</h2>
            <p className="text-body mt-3 text-secondary">Segunda a sábado, 9h–21h.</p>
            <div className="mt-5 flex flex-wrap gap-4">
              <a href="https://wa.me/5581989056181" target="_blank" rel="noopener noreferrer"
                className="text-cta inline-flex rounded-full bg-accent px-7 py-3.5 text-accent-fg transition-opacity hover:opacity-85">
                WhatsApp
              </a>
              <a href="https://instagram.com/saintlevon" target="_blank" rel="noopener noreferrer"
                className="text-cta inline-flex rounded-full border border-line px-7 py-3.5 text-fg transition-colors hover:border-fg">
                Instagram
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
