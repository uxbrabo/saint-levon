import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Distribuidores e Vendedores — SAINT LEVON",
  description: "Seja um distribuidor ou vendedor independente da SAINT LEVON. Programas para lojistas, revendedores e influenciadores.",
};

const PROGRAMAS = [
  {
    titulo: "Lojistas e Multimarcas",
    descricao: "Ideal para lojas físicas de surf, moda e lifestyle que querem incluir a SAINT LEVON no portfólio.",
    beneficios: [
      "Margem de 40–55% sobre o preço de tabela",
      "Pedido mínimo inicial de R$ 3.000",
      "Kit de vitrine e materiais de PDV",
      "Suporte de gerente de conta",
      "Reposição de estoque prioritária",
    ],
  },
  {
    titulo: "Vendedores Independentes",
    descricao: "Para pessoas físicas que querem revender a SAINT LEVON no modelo informal — redes sociais, ambiente de trabalho ou comunidade.",
    beneficios: [
      "Comissão de 20% sobre as vendas geradas",
      "Sem estoque mínimo obrigatório",
      "Materiais de divulgação gratuitos",
      "Link exclusivo de rastreamento",
      "Pagamento mensal via Pix",
    ],
  },
  {
    titulo: "Parceiros de Conteúdo",
    descricao: "Influenciadores, fotógrafos e criadores de conteúdo de surf, lifestyle e streetwear que queiram trabalhar com a marca.",
    beneficios: [
      "Comissão de 15% por venda gerada",
      "Peças para campanha sem custo",
      "Co-criação de coleções capsule",
      "Destaque no site e redes sociais",
      "Contratos flexíveis sem exclusividade",
    ],
  },
];

export default function DistribuidoresPage() {
  return (
    <main>
      <Section ariaLabel="Distribuidores e Vendedores" className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container>
          <div className="max-w-2xl">
            <span className="text-label text-secondary">Parcerias</span>
            <h1 className="font-display mt-3 text-4xl font-black uppercase tracking-tight text-fg md:text-5xl">
              Distribuidores e Vendedores
            </h1>
            <p className="text-body mt-6 text-secondary">
              A SAINT LEVON está expandindo. Queremos chegar em mais cidades do Brasil através de pessoas e lojas que compartilham nossos valores.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PROGRAMAS.map(({ titulo, descricao, beneficios }) => (
              <div key={titulo} className="flex flex-col rounded-3xl border border-line bg-surface p-8">
                <h2 className="font-display text-xl font-bold uppercase text-fg">{titulo}</h2>
                <p className="text-body mt-3 text-secondary">{descricao}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {beneficios.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-fg">✓</span>
                      <span className="text-body text-sm text-secondary">{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/5581989056181?text=Tenho interesse no programa: ${encodeURIComponent(titulo)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cta mt-8 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-accent-fg transition-opacity hover:opacity-85"
                >
                  Quero participar
                </a>
              </div>
            ))}
          </div>

          <div className="mt-16 max-w-2xl">
            <h2 className="font-display text-2xl font-bold uppercase text-fg">Requisitos gerais</h2>
            <div className="mt-6 flex flex-col gap-px overflow-hidden rounded-3xl border border-line">
              {[
                "Alinhamento com os valores da marca (surf, streetwear, autenticidade)",
                "Compromisso com o preço sugerido de venda ao consumidor",
                "Não vender em marketplaces sem autorização prévia (Mercado Livre, Shopee etc.)",
                "Uso dos materiais visuais fornecidos pela SAINT LEVON",
              ].map((req) => (
                <div key={req} className="bg-surface px-8 py-5">
                  <p className="text-body text-sm text-secondary">{req}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-3xl border border-line bg-surface p-8 md:p-12">
            <h2 className="font-display text-xl font-bold uppercase text-fg">Vamos conversar</h2>
            <p className="text-body mt-3 text-secondary">
              Mande uma mensagem com o nome da sua loja, cidade e o tipo de parceria que te interessa. Respondemos em até 48 horas.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <a
                href="https://wa.me/5581989056181?text=Olá! Tenho interesse em ser distribuidor da SAINT LEVON"
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
