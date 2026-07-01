import { Container, Section } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WaveText } from "@/components/WaveText";
import { techFeatures, type TechIconId } from "@/lib/products";
import { DropIcon, SunIcon, StitchIcon, FlexIcon, WaveIcon, LeafIcon } from "@/components/icons";

const ICONS: Record<TechIconId, typeof DropIcon> = {
  "quick-dry": DropIcon,
  "uv-shield": SunIcon,
  "seam-seal": StitchIcon,
  "flex-move": FlexIcon,
  "salt-resist": WaveIcon,
  "eco-fiber": LeafIcon,
};

export function TechFeatures() {
  return (
    <Section id="tecnologias" ariaLabel="Tecnologias" topPad={false} className="bg-bg transition-colors duration-300">
      <Container>
        <ScrollReveal direction="up" threshold={0.2}>
          <span className="text-label text-secondary">Materiais</span>
          <WaveText className="text-section mt-2 text-fg">Tecnologia pro seu movimento</WaveText>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {techFeatures.map((feature, i) => {
            const Icon = ICONS[feature.id];
            return (
              <ScrollReveal key={feature.id} direction="up" threshold={0.2} delay={(i % 6) * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-line text-fg"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-body mt-4 text-sm font-semibold text-fg">{feature.label}</h3>
                  <p className="text-label mt-2 text-secondary normal-case tracking-normal">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
