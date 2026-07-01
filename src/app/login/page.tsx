"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

// Ícones inline para não adicionar dependência externa
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.39 1.39-2.39 4.14.01 3.26 2.86 4.36 2.89 4.37l-.06.1zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

const PROVIDERS = [
  { id: "google", label: "Continuar com Google", icon: GoogleIcon, bg: "bg-surface border-line text-fg" },
  { id: "apple", label: "Continuar com Apple", icon: AppleIcon, bg: "bg-[#0a0a0a] border-[#0a0a0a] text-white dark:bg-white dark:border-white dark:text-[#0a0a0a]" },
];

export default function LoginPage() {
  const emailId = useId();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [tab, setTab] = useState<"oauth" | "email">("oauth");

  const handleProvider = async (provider: string) => {
    setLoading(provider);
    try {
      await signIn(provider, { callbackUrl: "/minha-conta" });
    } catch {
      setLoading(null);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading("email");
    try {
      await signIn("resend", { email, callbackUrl: "/minha-conta", redirect: false });
      setEmailSent(true);
    } catch {
      // TODO: mostrar erro
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6 py-24">
      <div className="w-full max-w-md">
        <Link href="/" className="font-display text-xl font-black uppercase text-fg">
          SAINT LEVON
        </Link>

        <h1 className="font-display mt-8 text-3xl font-black uppercase text-fg">
          Entrar na sua conta
        </h1>
        <p className="text-body mt-2 text-secondary">
          Acesse seus pedidos, favoritos e benefícios do SAINT LEVON Club.
        </p>

        <div className="mt-10 flex rounded-full border border-line p-1">
          <button
            type="button"
            onClick={() => setTab("oauth")}
            className={`text-cta flex-1 rounded-full py-2.5 transition-colors duration-200 ${tab === "oauth" ? "bg-accent text-accent-fg" : "text-secondary hover:text-fg"}`}
          >
            Social
          </button>
          <button
            type="button"
            onClick={() => setTab("email")}
            className={`text-cta flex-1 rounded-full py-2.5 transition-colors duration-200 ${tab === "email" ? "bg-accent text-accent-fg" : "text-secondary hover:text-fg"}`}
          >
            E-mail
          </button>
        </div>

        <div className="mt-6">
          {tab === "oauth" ? (
            <div className="flex flex-col gap-3">
              {PROVIDERS.map(({ id, label, icon: Icon, bg }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleProvider(id)}
                  disabled={!!loading}
                  className={`text-cta flex w-full items-center justify-center gap-3 rounded-full border px-6 py-3.5 transition-opacity duration-200 hover:opacity-85 disabled:opacity-50 ${bg}`}
                >
                  <Icon />
                  {loading === id ? "Aguarde..." : label}
                </button>
              ))}
              <p className="text-label mt-2 text-center text-secondary normal-case tracking-normal">
                Novos provedores disponíveis em breve.
              </p>
            </div>
          ) : emailSent ? (
            <div className="rounded-2xl border border-line bg-surface p-8 text-center">
              <p className="font-display text-lg font-bold uppercase text-fg">Verifique seu e-mail</p>
              <p className="text-body mt-3 text-secondary">
                Enviamos um link de acesso para <strong className="text-fg">{email}</strong>. Ele expira em 24 horas.
              </p>
              <button
                type="button"
                onClick={() => { setEmailSent(false); setEmail(""); }}
                className="text-label mt-6 text-secondary underline underline-offset-4"
              >
                Usar outro e-mail
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmail} className="flex flex-col gap-4">
              <div>
                <label htmlFor={emailId} className="text-label text-secondary">Seu e-mail</label>
                <input
                  id={emailId}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@exemplo.com"
                  className="text-body mt-2 w-full rounded-2xl border border-line bg-surface px-5 py-3.5 text-fg placeholder:text-secondary"
                />
              </div>
              <button
                type="submit"
                disabled={!!loading}
                className="text-cta rounded-full bg-accent py-3.5 text-accent-fg transition-opacity hover:opacity-85 disabled:opacity-50"
              >
                {loading === "email" ? "Enviando..." : "Receber link de acesso"}
              </button>
              <p className="text-label text-center text-secondary normal-case tracking-normal">
                Sem senha. Você recebe um link seguro por e-mail.
              </p>
            </form>
          )}
        </div>

        <p className="text-label mt-10 text-center text-secondary normal-case tracking-normal">
          Ao entrar, você concorda com nossa{" "}
          <Link href="/faq" className="text-fg underline underline-offset-4">política de privacidade</Link>.
        </p>
      </div>
    </main>
  );
}
