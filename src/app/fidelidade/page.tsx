import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Programa de Fidelidade — SAINT LEVON",
  description: "Conheça o SAINT LEVON Club: cashback, acesso antecipado e benefícios exclusivos para quem veste a marca.",
};

const NIVEIS = [
  {
    nivel: "Iniciante",
    requisito: "1ª compra",
    destaque: false,
    beneficios: ["2% de cashback em toda compra", "Newsletter exclusiva", "Novidades antes do lançamento público"],
  },
  {
    nivel: "Surfer",
    requisito: "R$ 800+ em compras",
    destaque: true,
    beneficios: ["5% de cashback em toda compra", "Acesso antecipado a lançamentos", "Desconto em datas especiais", "Frete grátis a partir de R$ 200"],
  },
  {
    nivel: "Legend",
    requisito: "R$ 2.000+ em compras",
    destaque: false,
    beneficios: ["8% de cashback em toda compra", "Convites para lançamentos exclusivos", "Brindes de aniversário", "Frete grátis em todos os pedidos", "Atendimento prioritário"],
  },
];

const PERGUNTAS = [
  { p: "Como o cashback é creditado?", r: "O cashback aparece como crédito na sua conta em até 15 dias após a entrega. Pode ser usado em qualquer compra futura, sem prazo de validade." },
  { p: "Posso perder o nível que alcancei?", r: "Não. Os níveis são permanentes. Uma vez Surfer, sempre Surfer — independente de quanto tempo fique sem comprar." },
  { p: "O cashback acumula com outros descontos?", r: "Sim. O cashback é calculado sobre o valor final da compra e acumula com qualquer cupom ou promoção ativa." },
  { p: "Como entro no Club?", r: "Automaticamente na primeira compra. Não precisa de cadastro extra — usamos seu e-mail de compra como identificador." },
];

export default function FidelidadePage() {
  return (
    <main>
      <Section ariaLabel="Programa de Fidelidade" className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container>
          <div className="max-w-2xl">
            <span className="text-label text-secondary">SAINT LEVON Club</span>
            <h1 className="font-display mt-3 text-4xl font-black uppercase tracking-tight text-fg md:text-5xl">
              Programa de Fidelidade
            </h1>
            <p className="text-body mt-6 text-secondary">
              Quanto mais você veste SAINT LEVON, mais você ganha. Cashback real, benefícios concretos, sem truques.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {NIVEIS.map(({ nivel, requisito, destaque, beneficios }) => (
              <div
                key={nivel}
                className={`flex flex-col rounded-3xl border p-8 ${
                  destaque ? "border-fg bg-fg text-bg" : "border-line bg-surface"
                }`}
              >
                {destaque && (
                  <span className="text-label mb-4 inline-block rounded-full border border-bg/30 px-3 py-1 normal-case tracking-normal text-bg/70">
                    Mais popular
                  </span>
                )}
                <h2 className={`font-display text-2xl font-black uppercase ${destaque ? "text-bg" : "text-fg"}`}>
                  {nivel}
                </h2>
                <p className={`text-label mt-1 normal-case tracking-normal ${destaque ? "text-bg/70" : "text-secondary"}`}>
                  {requisito}
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {beneficios.map((b) => (
                    <li key={b} className={`text-body flex items-start gap-3 text-sm ${destaque ? "text-bg/90" : "text-secondary"}`}>
                      <span className="mt-0.5 shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20 max-w-2xl">
            <h2 className="font-display text-2xl font-bold uppercase text-fg">Perguntas frequentes</h2>
            <div className="mt-8 flex flex-col gap-px overflow-hidden rounded-3xl border border-line">
              {PERGUNTAS.map(({ p, r }) => (
                <div key={p} className="bg-surface px-8 py-6">
                  <h3 className="font-display text-base font-bold uppercase text-fg">{p}</h3>
                  <p className="text-body mt-2 text-secondary">{r}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-3xl border border-line bg-surface p-8 md:p-12">
            <h2 className="font-display text-xl font-bold uppercase text-fg">Já é membro</h2>
            <p className="text-body mt-3 text-secondary">
              Qualquer dúvida sobre seus créditos ou nível atual, é só chamar.
            </p>
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
