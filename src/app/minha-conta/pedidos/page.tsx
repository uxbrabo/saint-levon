import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Container, Section } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Meus Pedidos — SAINT LEVON",
};

/**
 * TODO: substituir MOCK_ORDERS por consulta real ao banco de dados.
 * Quando o banco estiver configurado:
 *   const orders = await db.orders.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" } });
 */
const MOCK_ORDERS = [
  {
    id: "SL-874521",
    date: "28 jun 2026",
    status: "Entregue",
    total: 648,
    items: ["Moletom Arch (G)", "Boné Aba Curva (Único)"],
    tracking: "AA123456789BR",
  },
  {
    id: "SL-701234",
    date: "14 jun 2026",
    status: "Em trânsito",
    total: 379,
    items: ["Mochila Impermeável (Único)"],
    tracking: "BB987654321BR",
  },
];

const STATUS_COLORS: Record<string, string> = {
  "Entregue": "bg-fg/10 text-fg",
  "Em trânsito": "bg-line text-fg",
  "Em separação": "bg-line text-fg",
  "Aguardando pagamento": "bg-line text-secondary",
  "Cancelado": "bg-line text-secondary",
};

export default async function PedidosPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/minha-conta/pedidos");

  return (
    <main>
      <Section ariaLabel="Meus pedidos" className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container>
          <nav aria-label="Trilha" className="text-label flex items-center gap-2 text-secondary">
            <Link href="/minha-conta" className="hover:text-fg transition-colors">Minha conta</Link>
            <span>/</span>
            <span className="text-fg">Pedidos</span>
          </nav>

          <h1 className="font-display mt-6 text-3xl font-black uppercase text-fg md:text-4xl">
            Meus pedidos
          </h1>

          {MOCK_ORDERS.length === 0 ? (
            <div className="mt-16 text-center">
              <p className="font-display text-2xl text-fg">Nenhum pedido ainda</p>
              <p className="text-body mt-3 text-secondary">Suas compras aparecerão aqui.</p>
              <Link
                href="/catalogo"
                className="text-cta mt-6 inline-flex rounded-full bg-accent px-7 py-3.5 text-accent-fg transition-opacity hover:opacity-85"
              >
                Ver catálogo
              </Link>
            </div>
          ) : (
            <div className="mt-10 flex flex-col gap-6">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="rounded-3xl border border-line bg-surface p-6 md:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="font-display text-lg font-bold text-fg">{order.id}</h2>
                        <span className={`text-label rounded-full px-3 py-1 normal-case tracking-normal ${STATUS_COLORS[order.status] ?? "bg-line text-secondary"}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-label mt-1 text-secondary normal-case tracking-normal">{order.date}</p>
                    </div>
                    <p className="font-display text-2xl font-bold text-fg">
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(order.total)}
                    </p>
                  </div>

                  <ul className="mt-4 flex flex-col gap-1">
                    {order.items.map((item) => (
                      <li key={item} className="text-body text-sm text-secondary">{item}</li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-4 border-t border-line pt-5">
                    <a
                      href={`https://rastreamento.correios.com.br/app/index.php?objeto=${order.tracking}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-label text-fg underline underline-offset-4 hover:text-secondary transition-colors normal-case tracking-normal"
                    >
                      Rastrear ({order.tracking})
                    </a>
                    <a
                      href={`https://wa.me/5581989056181?text=Olá! Tenho uma dúvida sobre o pedido ${order.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-label text-secondary underline underline-offset-4 hover:text-fg transition-colors normal-case tracking-normal"
                    >
                      Falar sobre este pedido
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 rounded-3xl border border-line bg-surface p-6">
            <p className="text-label text-secondary normal-case tracking-normal">
              <strong className="text-fg">Nota:</strong> o histórico de pedidos será sincronizado automaticamente quando o sistema de pagamentos estiver ativo. Por enquanto, os pedidos acima são demonstrativos.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
