import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";
import Resend from "next-auth/providers/resend";

/**
 * Configuração central de autenticação — NextAuth v5 (Auth.js)
 *
 * Provedores disponíveis:
 *  - Google  → requer GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET
 *  - Apple   → requer APPLE_ID + APPLE_SECRET + APPLE_TEAM_ID + APPLE_KEY_ID
 *  - E-mail  → magic link via Resend (RESEND_API_KEY)
 *
 * Sem as variáveis configuradas, o provider é omitido automaticamente.
 * O site continua funcionando — apenas os botões de login ficam desativados.
 *
 * TODO: conectar ao banco de dados (DATABASE_URL) para persistir sessões
 * e histórico de pedidos. Recomendado: @auth/prisma-adapter + Vercel Postgres.
 */

const providers = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

if (process.env.APPLE_ID && process.env.APPLE_SECRET) {
  providers.push(
    Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    })
  );
}

if (process.env.RESEND_API_KEY) {
  providers.push(
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.EMAIL_FROM ?? "login@saintlevon.com.br",
    })
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret-change-in-production",
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
});

/** Lista de provedores configurados — usada no front para mostrar/ocultar botões */
export const configuredProviders = {
  google: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  apple: !!(process.env.APPLE_ID && process.env.APPLE_SECRET),
  email: !!process.env.RESEND_API_KEY,
};
