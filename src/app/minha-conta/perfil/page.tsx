"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Container, Section } from "@/components/layout/Container";

export default function PerfilPage() {
  const { data: session, status } = useSession();
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const addressId = useId();

  const [saved, setSaved] = useState(false);

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg">
        <p className="text-body text-secondary">Carregando...</p>
      </main>
    );
  }

  if (!session?.user) {
    redirect("/login?callbackUrl=/minha-conta/perfil");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: chamar /api/usuarios/atualizar quando o banco estiver ativo
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main>
      <Section ariaLabel="Meu perfil" className="bg-bg pt-32 transition-colors duration-300 md:pt-36">
        <Container className="max-w-2xl">
          <nav aria-label="Trilha" className="text-label flex items-center gap-2 text-secondary">
            <Link href="/minha-conta" className="hover:text-fg transition-colors">Minha conta</Link>
            <span>/</span>
            <span className="text-fg">Perfil</span>
          </nav>

          <h1 className="font-display mt-6 text-3xl font-black uppercase text-fg md:text-4xl">
            Meu perfil
          </h1>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor={nameId} className="text-label text-secondary">Nome completo</label>
              <input
                id={nameId}
                type="text"
                defaultValue={session.user.name ?? ""}
                className="text-body rounded-2xl border border-line bg-surface px-5 py-3.5 text-fg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={emailId} className="text-label text-secondary">E-mail</label>
              <input
                id={emailId}
                type="email"
                defaultValue={session.user.email ?? ""}
                disabled
                className="text-body cursor-not-allowed rounded-2xl border border-line bg-surface px-5 py-3.5 text-secondary opacity-60"
              />
              <p className="text-label normal-case tracking-normal text-secondary">
                O e-mail está vinculado ao seu método de login e não pode ser alterado aqui.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={phoneId} className="text-label text-secondary">WhatsApp / Telefone</label>
              <input
                id={phoneId}
                type="tel"
                placeholder="(81) 99999-9999"
                className="text-body rounded-2xl border border-line bg-surface px-5 py-3.5 text-fg placeholder:text-secondary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={addressId} className="text-label text-secondary">Endereço principal de entrega</label>
              <input
                id={addressId}
                type="text"
                placeholder="Rua, número, bairro — Cidade, PE, CEP"
                className="text-body rounded-2xl border border-line bg-surface px-5 py-3.5 text-fg placeholder:text-secondary"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                className="text-cta rounded-full bg-accent px-7 py-3.5 text-accent-fg transition-opacity hover:opacity-85"
              >
                {saved ? "Salvo ✓" : "Salvar alterações"}
              </button>
              <p className="text-label normal-case tracking-normal text-secondary">
                {saved && "Informações atualizadas com sucesso."}
              </p>
            </div>
          </form>

          <div className="mt-16 rounded-3xl border border-line bg-surface p-6">
            <h2 className="font-display text-base font-bold uppercase text-fg">Excluir conta</h2>
            <p className="text-body mt-2 text-secondary">
              Para excluir sua conta, entre em contato pelo WhatsApp. Todos os seus dados serão removidos permanentemente.
            </p>
            <a
              href="https://wa.me/5581989056181?text=Quero excluir minha conta na SAINT LEVON"
              className="text-label mt-4 inline-block normal-case tracking-normal text-secondary underline underline-offset-4 hover:text-fg transition-colors"
            >
              Solicitar exclusão de conta
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}
