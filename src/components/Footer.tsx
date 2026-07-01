import { InstagramIcon, TiktokIcon, YoutubeIcon } from "@/components/icons";

const COLUMNS = [
  {
    title: "Catálogo",
    links: ["Surf", "Streetwear", "Treino", "Praia", "Todos os produtos"],
  },
  {
    title: "Atendimento",
    links: [
      "Entrega e pagamento",
      "Trocas e devoluções",
      "Tabela de tamanhos",
      "Programa de fidelidade",
      "Perguntas frequentes",
    ],
  },
  {
    title: "Empresa",
    links: ["Sobre nós", "Tecnologias", "Blog", "Carreiras", "Contato"],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com", icon: TiktokIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer id="footer" className="bg-surface text-fg transition-colors duration-300">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-xl text-fg">SAINT LEVON</p>
            <p className="text-body mt-3 max-w-xs text-secondary">
              Roupa premium pra vida de surf e cidade. Tecnologia, conforto e atitude em cada peça.
            </p>
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

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-label text-secondary">{column.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-body text-sm text-fg transition-colors duration-200 hover:text-secondary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-label text-secondary">Contato</h3>
            <ul className="mt-5 flex flex-col gap-3 text-fg">
              <li className="text-body text-sm">0800 123 4567</li>
              <li className="text-body text-sm">contato@saintlevon.com.br</li>
              <li className="text-body text-sm">São Paulo, SP</li>
              <li className="text-body text-sm">Seg–Sáb, 9h–21h</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-label text-secondary">
            © {new Date().getFullYear()} SAINT LEVON. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-label text-secondary transition-colors duration-200 hover:text-fg">
              Política de privacidade
            </a>
            <a href="#" className="text-label text-secondary transition-colors duration-200 hover:text-fg">
              Termos de uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
