import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Tecnologias — SAINT LEVON",
  description: "Conheça as tecnologias desenvolvidas pela SAINT LEVON para roupas de surf, treino e lifestyle.",
};

const TECHS = [
  {
    id: "quick-dry",
    nome: "Quick Dry",
    tagline: "Seca antes do próximo set.",
    descricao:
      "Tecido de microfibra com fibras ocas que aceleram a evaporação da água. A SAINT LEVON Quick Dry seca até 5× mais rápido que o algodão convencional, mantendo o conforto em qualquer temperatura.",
    aplicacao: "Camisetas Técnicas, Boardshorts, Lycras",
    detalhe: "Certificado Oeko-Tex Standard 100 — livre de substâncias nocivas.",
  },
  {
    id: "uv-shield",
    nome: "UV Shield",
    tagline: "O sol não te pega.",
    descricao:
      "Proteção solar incorporada na própria fibra do tecido — não na estampa, não no acabamento superficial. Fator de proteção UPF 50+, mantido lavagem após lavagem por até 50 ciclos.",
    aplicacao: "Camisetas Técnicas, Lycras, Viseiras",
    detalhe: "Bloqueio de 98% dos raios UVA e UVB.",
  },
  {
    id: "seam-seal",
    nome: "Seam Seal",
    tagline: "Zero atrito, zero irritação.",
    descricao:
      "Costuras seladas a laser ou com fita termoplástica que eliminam pontas de linha e relevos internos. Resultado: zero abrasão em sessões longas, seja na prancha ou no treino.",
    aplicacao: "Wetsuits, Boardshorts",
    detalhe: "Resistência à tração 40% superior a costuras convencionais.",
  },
  {
    id: "flex-move",
    nome: "Flex Move",
    tagline: "O tecido que acompanha cada manobra.",
    descricao:
      "Estrutura de lycra bidirecional com elasticidade de 4 vias. Permite amplitude total de movimento sem perder a forma ou o caimento após uso e lavagem.",
    aplicacao: "Boardshorts, Leggings, Tops Esportivos",
    detalhe: "Recuperação de 98% do formato original após deformação.",
  },
  {
    id: "salt-resist",
    nome: "Salt Resist",
    tagline: "A maresia não desgasta, a roupa dura.",
    descricao:
      "Tratamento químico inert nas fibras que neutraliza os efeitos corrosivos do sal e do cloro. Mantém o tecido íntegro, sem desbotamento ou degradação acelerada.",
    aplicacao: "Toda a linha Surf e Praia",
    detalhe: "Testado em 200 ciclos de imersão em água salgada.",
  },
  {
    id: "eco-fiber",
    nome: "Eco Fiber",
    tagline: "Roupa boa sem custar o planeta.",
    descricao:
      "Poliéster reciclado de garrafas PET recolhidas no litoral do Nordeste. Cada peça usa em média 12 garrafas que sairiam do mar. Mesmo desempenho, impacto ambiental 45% menor.",
    aplicacao: "Boardshorts, Mochila Impermeável",
    detalhe: "Parceria com cooperativas de catadores de Recife e Olinda.",
  },
];

export default function TecnologiasPage() {
  return (
    <main>
      <Section ariaLabel="Tecnologias SAINT LEVON" className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container>
          <div className="max-w-2xl">
            <span className="text-label text-secondary">Inovação têxtil</span>
            <h1 className="font-display mt-3 text-4xl font-black uppercase tracking-tight text-fg md:text-6xl">
              Tecnologia feita pra água
            </h1>
            <p className="text-body mt-6 text-secondary">
              Não desenvolvemos tecnologia por marketing. Desenvolvemos porque surfamos, treinamos e vivemos a rotina que nossas roupas precisam aguentar.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TECHS.map((tech) => (
              <div key={tech.id} className="flex flex-col rounded-3xl border border-line bg-surface p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line">
                  <span className="font-display text-xs font-bold uppercase text-fg">
                    {tech.nome.slice(0, 2)}
                  </span>
                </div>
                <h2 className="font-display mt-5 text-xl font-bold uppercase text-fg">{tech.nome}</h2>
                <p className="text-label mt-1 text-secondary normal-case tracking-normal italic">{tech.tagline}</p>
                <p className="text-body mt-4 text-secondary">{tech.descricao}</p>
                <div className="mt-auto pt-6">
                  <p className="text-label text-secondary">Onde usar</p>
                  <p className="text-body mt-1 text-sm text-fg">{tech.aplicacao}</p>
                  <p className="text-label mt-4 normal-case tracking-normal text-secondary italic">{tech.detalhe}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 rounded-3xl border border-line bg-surface p-8 md:p-12">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-black uppercase text-fg">Como testamos</h2>
              <p className="text-body mt-4 text-secondary">
                Cada tecnologia passa por pelo menos 6 meses de testes reais antes de entrar na linha de produção. Surfistas, atletas e pessoas comuns de Recife são nossos primeiros avaliadores — sem laboratório que substitua o oceano.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-8">
                {[
                  { num: "200+", label: "ciclos de lavagem testados" },
                  { num: "6 meses", label: "de testes em campo" },
                  { num: "50+", label: "avaliadores reais" },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <p className="font-display text-3xl font-black text-fg">{num}</p>
                    <p className="text-label mt-1 text-secondary normal-case tracking-normal">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
