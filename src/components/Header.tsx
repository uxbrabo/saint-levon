"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useTheme } from "@/context/ThemeProvider";
import { useCart } from "@/context/CartProvider";
import { CartIcon, ThemeIcon } from "@/components/icons";

const NAV_LINKS = [
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Categorias", href: "/#categorias" },
  { label: "Tecnologias", href: "/#tecnologias" },
  { label: "Sobre nós", href: "/#footer" },
];

function MenuIcon({ open, light }: { open: boolean; light: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={`h-5 w-5 ${light ? "text-white" : "text-fg"}`}
      aria-hidden="true"
    >
      <motion.path
        d="M4 7h16"
        animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        style={{ originX: "12px", originY: "7px" }}
        strokeLinecap="round"
      />
      <motion.path d="M4 12h16" animate={{ opacity: open ? 0 : 1 }} strokeLinecap="round" />
      <motion.path
        d="M4 17h16"
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        style={{ originX: "12px", originY: "17px" }}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { count, open: openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 32);
  });

  const transparent = pathname === "/" && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        transparent
          ? "border-transparent bg-transparent"
          : "border-line bg-bg/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-6 md:px-12 lg:px-20">
        <Link
          href="/"
          className={`font-display text-lg tracking-tight md:text-xl ${transparent ? "text-white" : "text-fg"}`}
        >
          SAINT LEVON
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className={`text-label relative inline-block py-1 transition-colors duration-300 ${
                    transparent ? "text-white/85" : "text-fg"
                  }`}
                >
                  {link.label}
                  <motion.span
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originX: 0 }}
                    className={`absolute -bottom-0.5 left-0 h-px w-full ${transparent ? "bg-white" : "bg-fg"}`}
                  />
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
            className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-colors duration-200 ${
              transparent ? "text-white hover:bg-white/10" : "text-fg hover:bg-surface"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex"
              >
                <ThemeIcon theme={theme} className="h-5 w-5" />
              </motion.span>
            </AnimatePresence>
          </button>

          <a
            href="#entrar"
            className={`text-cta hidden items-center rounded-full border px-5 py-2.5 transition-colors duration-200 sm:inline-flex ${
              transparent
                ? "border-white/50 text-white hover:border-white"
                : "border-line text-fg hover:border-fg"
            }`}
          >
            Entrar
          </a>

          <motion.button
            type="button"
            onClick={openCart}
            whileTap={{ scale: 0.95 }}
            aria-label={`Abrir carrinho de compras, ${count} ${count === 1 ? "item" : "itens"}`}
            className={`text-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 transition-colors duration-300 ${
              transparent ? "bg-white text-[#0a0a0a]" : "bg-accent text-accent-fg"
            }`}
          >
            <CartIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Carrinho</span>
            <span className="relative flex h-5 min-w-5 items-center justify-center" aria-hidden="true">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-label absolute inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0a0a0a]/15 px-1 text-[10px]"
                >
                  {count}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 md:hidden ${
              transparent ? "hover:bg-white/10" : "hover:bg-surface"
            }`}
          >
            <MenuIcon open={menuOpen} light={transparent} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Navegação principal (mobile)"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-bg md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-body block py-2.5 text-fg transition-colors duration-200 hover:text-secondary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="sm:hidden">
                <a
                  href="#entrar"
                  onClick={() => setMenuOpen(false)}
                  className="text-body block py-2.5 text-fg transition-colors duration-200 hover:text-secondary"
                >
                  Entrar
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
