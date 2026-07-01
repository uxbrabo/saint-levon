import Link from "next/link";
import { InstagramIcon, TiktokIcon, YoutubeIcon } from "@/components/icons";

const NAV = [
  {
    title: "Catálogo",
    links: [
      { label: "Todos os produtos", href: "/catalogo" },
      { label: "Streetwear", href: "/catalogo?categoria=Streetwear" },
      { label: "Treino", href: "/catalogo?categoria=Treino" },
      { label: "Praia", href: "/catalogo?categoria=Praia" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { label: "Entrega e envio", href: "/entrega" },
      { label: "Trocas e devoluções", href: "/trocas" },
      { label: "Programa de fidelidade", href: "/fidelidade" },
      { label: "Perguntas frequentes", href: "/faq" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nós", href: "/sobre" },
      { label: "Tecnologias", href: "/tecnologias" },
      { label: "Blog", href: "/blog" },
      { label: "Carreiras", href: "/carreiras" },
      { label: "Distribuidores", href: "/distribuidores" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/saintlevon", icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com", icon: TiktokIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer id="footer" className="bg-surface text-fg transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="font-display text-xl text-fg">SAINT LEVON</Link>
            <p className="text-body mt-3 max-w-xs text-secondary">
              Roupa premium pra vida de surf e cidade. Feita em Recife, usada no mundo.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <a
                href="https://wa.me/5581989056181"
                target="_blank"
                rel="noopener noreferrer"
                className="text-label text-secondary transition-colors duration-200 hover:text-fg normal-case tracking-normal"
              >
                WhatsApp: (81) 98905-6181
              </a>
              <p className="text-label normal-case tracking-normal text-secondary">
                contato@saintlevon.com.br
              </p>
              <p className="text-label normal-case tracking-normal text-secondary">
                Recife, PE — Brasil
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg transition-colors duration-200 hover:border-fg"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {NAV.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-label text-secondary">{column.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body text-sm text-fg transition-colors duration-200 hover:text-secondary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-label text-secondary">
            © {new Date().getFullYear()} SAINT LEVON. Todos os direitos reservados.
          </p>
          <div className="flex flex-col gap-2 sm:items-end">
            <div className="flex gap-6">
              <Link href="/faq" className="text-label text-secondary transition-colors duration-200 hover:text-fg">
                Política de privacidade
              </Link>
              <Link href="/faq" className="text-label text-secondary transition-colors duration-200 hover:text-fg">
                Termos de uso
              </Link>
            </div>
            <p className="text-label text-secondary normal-case tracking-normal">
              Desenvolvido por{" "}
              <a
                href="https://instagram.com/forbend_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg transition-colors duration-200 hover:text-secondary"
              >
                Forbend_
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
