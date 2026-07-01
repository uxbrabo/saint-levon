import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Sobre Nós — SAINT LEVON",
  description: "Conheça a história da SAINT LEVON, marca de lifestyle surf e streetwear fundada em Recife por Leonardo Sodré.",
};

export default function SobrePage() {
  return (
    <main>
      <Section ariaLabel="Sobre a SAINT LEVON" className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container>
          <div className="max-w-3xl">
            <span className="text-label text-secondary">Nossa história</span>
            <h1 className="font-display mt-3 text-4xl font-black uppercase tracking-tight text-fg md:text-6xl">
              Da praia pra rua, de Recife pro mundo
            </h1>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface">
              <Image
                src="/videos/hero.jpeg"
                alt="Modelos SAINT LEVON na praia de Recife"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover grayscale"
              />
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <h2 className="font-display text-2xl font-bold uppercase text-fg">O fundador</h2>
                <p className="text-body mt-4 text-secondary">
                  <strong className="text-fg">Leonardo Sodré</strong> cresceu entre o mar e as ruas de Recife — uma cidade que não separa as duas coisas. Surfista desde a adolescência e apaixonado por cultura urbana, ele sentiu na pele a falta de uma marca que entendesse essa dupla identidade.
                </p>
                <p className="text-body mt-4 text-secondary">
                  Em 2023, criou a SAINT LEVON com uma premissa simples: fazer roupas que aguentam a maré e ficam bem na calçada. Sem escolher um lado.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold uppercase text-fg">A marca</h2>
                <p className="text-body mt-4 text-secondary">
                  SAINT LEVON nasce em Recife e fala a língua do Nordeste — direta, confiante, sem frescura. Cada peça é pensada para durar: tecidos técnicos que suportam sessões de surf e lavagens semanais com o mesmo desempenho do primeiro dia.
                </p>
                <p className="text-body mt-4 text-secondary">
                  Não trabalhamos com moda de temporada. Trabalhamos com roupas que fazem sentido no dia a dia de quem vive entre o mar e a cidade.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold uppercase text-fg">Nossa missão</h2>
                <p className="text-body mt-4 text-secondary">
                  Fazer a melhor roupa de surf e lifestyle do Brasil — com tecnologia, honestidade e design que não envelhece. Cada lançamento é testado em água antes de chegar ao seu guarda-roupa.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { number: "2023", label: "Fundação em Recife, PE" },
              { number: "7+", label: "Tecnologias desenvolvidas" },
              { number: "10k+", label: "Clientes satisfeitos" },
            ].map(({ number, label }) => (
              <div key={label} className="rounded-3xl border border-line bg-surface p-8">
                <p className="font-display text-5xl font-black text-fg">{number}</p>
                <p className="text-body mt-2 text-secondary">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 max-w-2xl">
            <h2 className="font-display text-3xl font-black uppercase text-fg">Nossos valores</h2>
            <div className="mt-8 flex flex-col gap-6">
              {[
                { titulo: "Honestidade", texto: "Não prometemos o que não entregamos. As fotos são reais, as tecnologias são reais, os preços são justos." },
                { titulo: "Durabilidade", texto: "Cada peça é desenvolvida para durar. Contra o fast fashion, contra o descarte." },
                { titulo: "Pertencimento", texto: "Não somos uma marca de nicho. Somos de quem surfa antes do trabalho e vai à academia depois da praia." },
                { titulo: "Recife", texto: "Orgulhosos da nossa origem. A cidade que moldou a marca molda cada detalhe das nossas peças." },
              ].map(({ titulo, texto }) => (
                <div key={titulo} className="border-t border-line pt-6">
                  <h3 className="font-display text-lg font-bold uppercase text-fg">{titulo}</h3>
                  <p className="text-body mt-2 text-secondary">{texto}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <p className="text-body text-secondary">Quer conversar com a gente?</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <a
                href="https://wa.me/5581989056181"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cta inline-flex rounded-full bg-accent px-7 py-3.5 text-accent-fg transition-opacity duration-200 hover:opacity-85"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com/saintlevon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cta inline-flex rounded-full border border-line px-7 py-3.5 text-fg transition-colors duration-200 hover:border-fg"
              >
                @saintlevon
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
