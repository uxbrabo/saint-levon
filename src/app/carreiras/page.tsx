import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Carreiras — SAINT LEVON",
  description: "Trabalhe com a SAINT LEVON. Veja as vagas abertas e envie seu currículo.",
};

const VAGAS = [
  {
    titulo: "Designer de Produto",
    tipo: "Presencial · Recife, PE",
    descricao: "Criar e desenvolver novas peças da linha SAINT LEVON, desde o conceito até o protótipo final. Experiência com moda técnica ou sportswear é diferencial.",
  },
  {
    titulo: "Analista de E-commerce",
    tipo: "Remoto · Tempo integral",
    descricao: "Gerenciar a operação da loja online, analisar métricas, otimizar conversão e coordenar campanhas digitais com o time de conteúdo.",
  },
  {
    titulo: "Fotógrafo(a) de Produto",
    tipo: "Freelance · Recife, PE",
    descricao: "Fotografia de campanha e produto para a linha SAINT LEVON. Portfólio com moda, esporte ou lifestyle obrigatório.",
  },
  {
    titulo: "Atendimento ao Cliente",
    tipo: "Remoto · Meio período",
    descricao: "Responder dúvidas via WhatsApp e e-mail, processar trocas e garantir que cada cliente tenha a melhor experiência possível.",
  },
];

const VALORES = [
  { titulo: "Trabalho real", descricao: "Somos uma equipe pequena. Cada pessoa tem impacto direto no produto e na empresa." },
  { titulo: "Liberdade de criação", descricao: "Valorizamos quem tem opinião e propõe soluções. Não queremos executores — queremos pensadores." },
  { titulo: "Cultura de praia e rua", descricao: "Valorizamos equilíbrio. Ninguém precisa provar dedicação ficando até tarde." },
  { titulo: "Crescimento compartilhado", descricao: "Quando a SAINT LEVON cresce, a equipe cresce junto — em responsabilidade, autonomia e remuneração." },
];

export default function CarreirasPage() {
  return (
    <main>
      <Section ariaLabel="Carreiras" className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container>
          <div className="max-w-2xl">
            <span className="text-label text-secondary">Junte-se à equipe</span>
            <h1 className="font-display mt-3 text-4xl font-black uppercase tracking-tight text-fg md:text-5xl">
              Carreiras
            </h1>
            <p className="text-body mt-6 text-secondary">
              A SAINT LEVON está crescendo. Procuramos pessoas que vivem o que vestimos — comprometidas, criativas e que não ficam esperando a maré virar.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold uppercase text-fg">Nossa cultura</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {VALORES.map(({ titulo, descricao }) => (
                <div key={titulo} className="rounded-3xl border border-line bg-surface p-8">
                  <h3 className="font-display text-lg font-bold uppercase text-fg">{titulo}</h3>
                  <p className="text-body mt-3 text-secondary">{descricao}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold uppercase text-fg">Vagas abertas</h2>
            <div className="mt-8 flex flex-col gap-4">
              {VAGAS.map(({ titulo, tipo, descricao }) => (
                <div key={titulo} className="rounded-3xl border border-line bg-surface p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold uppercase text-fg">{titulo}</h3>
                      <p className="text-label mt-1 text-secondary normal-case tracking-normal">{tipo}</p>
                    </div>
                    <a
                      href={`https://wa.me/5581989056181?text=Tenho interesse na vaga de ${encodeURIComponent(titulo)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cta mt-4 inline-flex shrink-0 rounded-full bg-accent px-6 py-3 text-accent-fg transition-opacity hover:opacity-85 sm:mt-0"
                    >
                      Candidatar
                    </a>
                  </div>
                  <p className="text-body mt-4 text-secondary">{descricao}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-3xl border border-line bg-surface p-8 md:p-12">
            <h2 className="font-display text-xl font-bold uppercase text-fg">Não achou sua vaga?</h2>
            <p className="text-body mt-3 text-secondary">
              Envie seu portfólio ou currículo para o WhatsApp com o assunto &ldquo;Candidatura Espontânea&rdquo;. Guardamos todos os contatos para futuras oportunidades.
            </p>
            <a
              href="https://wa.me/5581989056181?text=Quero enviar minha candidatura espontânea para a SAINT LEVON"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cta mt-5 inline-flex rounded-full bg-accent px-7 py-3.5 text-accent-fg transition-opacity hover:opacity-85"
            >
              Enviar candidatura
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}
