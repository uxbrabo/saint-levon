import { Container } from "@/components/layout/Container";
import { TruckIcon, ReturnIcon, ShieldIcon, SupportIcon } from "@/components/icons";

const ITEMS = [
  { icon: TruckIcon, title: "Frete grátis", subtitle: "acima de R$ 350" },
  { icon: ReturnIcon, title: "14 dias para troca", subtitle: "sem complicação" },
  { icon: ShieldIcon, title: "Produto original", subtitle: "garantia de qualidade" },
  { icon: SupportIcon, title: "Suporte 24/7", subtitle: "estamos sempre por aqui" },
];

export function TrustBar() {
  return (
    <section aria-label="Garantias da loja" className="border-y border-line bg-bg py-12 transition-colors duration-300">
      <Container>
        <div className="grid grid-cols-2 gap-y-0 divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-3 border-b border-line py-5 sm:border-b-0 sm:px-6 sm:py-0 sm:first:pl-0">
              <Icon className="h-6 w-6 shrink-0 text-accent" />
              <div>
                <p className="text-body text-sm font-semibold text-fg">{title}</p>
                <p className="text-label text-secondary">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
