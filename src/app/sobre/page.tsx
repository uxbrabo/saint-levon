import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Sobre Nós — SAINT LEVON",
  description: "Conheça a história da SAINT LEVON, marca de lifestyle surf e streetwear fundada em Recife por Leonardo Sodré.",
};

export default function SobrePage() {
  return (
    <main>
      {/* Hero editorial — foto de perfil com capuz */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-[#0a0a0a]">
        <Image
          src="/images/founder/leonardo-perfil.jpeg"
          alt="Leonardo Sodré, fundador da SAINT LEVON, em retrato de estúdio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[40%_top]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 flex h-full items-end p-6 md:p-12 lg:p-20">
          <div>
            <span className="text-label text-white/60">Fundador</span>
            <h1 className="font-display mt-2 text-4xl font-black uppercase text-white md:text-6xl">
              Leonardo Sodré
            </h1>
            <p className="text-body mt-2 text-white/70">Recife, PE · Fundador da SAINT LEVON</p>
          </div>
        </div>
      </section>

      <Section ariaLabel="Sobre a SAINT LEVON" className="bg-bg transition-colors duration-300">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            {/* Texto */}
            <div className="flex flex-col gap-10">
              <div>
                <span className="text-label text-secondary">Nossa história</span>
                <h2 className="font-display mt-3 text-3xl font-black uppercase text-fg md:text-4xl">
                  Da praia pra rua, de Recife pro mundo
                </h2>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold uppercase text-fg">O fundador</h3>
                <p className="text-body mt-4 text-secondary">
                  <strong className="text-fg">Leonardo Sodré</strong> cresceu entre o mar e as ruas de Recife — uma cidade que não separa as duas coisas. Surfista desde a adolescência e apaixonado por cultura urbana, ele sentiu na pele a falta de uma marca que entendesse essa dupla identidade.
                </p>
                <p className="text-body mt-4 text-secondary">
                  Em 2023, criou a SAINT LEVON com uma premissa simples: fazer roupas que aguentam a maré e ficam bem na calçada. Sem escolher um lado.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold uppercase text-fg">A marca</h3>
                <p className="text-body mt-4 text-secondary">
                  SAINT LEVON nasce em Recife e fala a língua do Nordeste — direta, confiante, sem frescura. Cada peça é pensada para durar: tecidos técnicos que suportam sessões de surf e lavagens semanais com o mesmo desempenho do primeiro dia.
                </p>
                <p className="text-body mt-4 text-secondary">
                  Não trabalhamos com moda de temporada. Trabalhamos com roupas que fazem sentido no dia a dia de quem vive entre o mar e a cidade.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold uppercase text-fg">Nossa missão</h3>
                <p className="text-body mt-4 text-secondary">
                  Fazer a melhor roupa de surf e lifestyle do Brasil — com tecnologia, honestidade e design que não envelhece. Cada lançamento é testado em água antes de chegar ao seu guarda-roupa.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
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

            {/* Foto de frente */}
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-surface">
                <Image
                  src="/images/founder/leonardo-frente.jpeg"
                  alt="Leonardo Sodré, fundador da SAINT LEVON, retrato de estúdio de frente"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-label text-center text-secondary normal-case tracking-normal">
                Leonardo Sodré — Fundador, Recife 2023
              </p>
            </div>
          </div>

          {/* Números */}
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

          {/* Valores */}
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

          {/* O moletom — produto usado pelo fundador */}
          <div className="mt-20 overflow-hidden rounded-3xl border border-line bg-surface">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-[3/2] lg:aspect-auto">
                <Image
                  src="/images/products/moletom-male-studio.jpeg"
                  alt="Moletom Arch SAINT LEVON usado por modelo em estúdio"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover grayscale"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="text-label text-secondary">A peça do fundador</span>
                <h2 className="font-display mt-3 text-2xl font-bold uppercase text-fg">Moletom Arch</h2>
                <p className="text-body mt-4 text-secondary">
                  O moletom que Leonardo usa no dia a dia é o mesmo que está no catálogo. Moletom flanelado 320g, capuz forrado, corte oversized. Feito pra durar mais do que uma temporada.
                </p>
                <Link
                  href="/produto/moletom-arch"
                  className="text-cta mt-6 inline-flex w-fit rounded-full bg-accent px-7 py-3.5 text-accent-fg transition-opacity hover:opacity-85"
                >
                  Ver Moletom Arch
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
