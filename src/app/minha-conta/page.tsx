import type { Metadata } from "next";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Container, Section } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Minha Conta — SAINT LEVON",
};

export default async function MinhaContaPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/minha-conta");

  const { user } = session;
  const primeiroNome = user.name?.split(" ")[0] ?? "Cliente";

  return (
    <main>
      <Section ariaLabel="Minha conta" className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-label text-secondary">Bem-vindo de volta</span>
              <h1 className="font-display mt-2 text-4xl font-black uppercase text-fg">
                Olá, {primeiroNome}
              </h1>
              <p className="text-body mt-1 text-secondary">{user.email}</p>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="text-label text-secondary underline underline-offset-4 hover:text-fg transition-colors"
              >
                Sair
              </button>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/minha-conta/pedidos",
                titulo: "Meus pedidos",
                descricao: "Acompanhe o status, rastreamento e histórico de todas as suas compras.",
                icone: "📦",
              },
              {
                href: "/minha-conta/perfil",
                titulo: "Meu perfil",
                descricao: "Edite suas informações de contato, endereço e preferências.",
                icone: "👤",
              },
              {
                href: "/fidelidade",
                titulo: "SAINT LEVON Club",
                descricao: "Veja seu nível, cashback acumulado e benefícios disponíveis.",
                icone: "⭐",
              },
            ].map(({ href, titulo, descricao, icone }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col rounded-3xl border border-line bg-surface p-8 transition-colors duration-200 hover:border-fg"
              >
                <span className="text-3xl" aria-hidden="true">{icone}</span>
                <h2 className="font-display mt-5 text-xl font-bold uppercase text-fg">{titulo}</h2>
                <p className="text-body mt-3 text-secondary">{descricao}</p>
                <span className="text-label mt-5 text-secondary group-hover:text-fg transition-colors">
                  Acessar →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-line bg-surface p-8">
            <h2 className="font-display text-xl font-bold uppercase text-fg">Atendimento rápido</h2>
            <p className="text-body mt-3 text-secondary">
              Precisa de ajuda com um pedido? Fale diretamente com a equipe.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <a
                href="https://wa.me/5581989056181"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cta rounded-full bg-accent px-6 py-3 text-accent-fg transition-opacity hover:opacity-85"
              >
                WhatsApp
              </a>
              <a
                href="mailto:contato@saintlevon.com.br"
                className="text-cta rounded-full border border-line px-6 py-3 text-fg transition-colors hover:border-fg"
              >
                E-mail
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
