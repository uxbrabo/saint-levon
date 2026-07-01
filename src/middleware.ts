import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Middleware de autenticação — protege rotas privadas.
 * Se o usuário não estiver logado, redireciona para /login.
 */
export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const isProtected = req.nextUrl.pathname.startsWith("/minha-conta");

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/minha-conta/:path*"],
};
