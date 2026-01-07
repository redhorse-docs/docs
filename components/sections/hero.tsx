import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

type HeroProps = {
  title: string;
  subtitle: string;
  ctas: Array<{ label: string; href: string }>;
};

export function Hero({ title, subtitle, ctas }: HeroProps) {
  return (
    <section
      id="overview"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[var(--rh-surface)]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(224,50,58,0.35),_transparent_55%)]" />
      <Container className="flex flex-col gap-10 py-24 text-white md:py-32">
        <p className="text-sm uppercase tracking-[0.4em] text-white/40">
          Protocol Update
        </p>
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg text-white/70">{subtitle}</p>
        </div>
        <div className="flex flex-col gap-4 text-sm sm:flex-row">
          {ctas.map((cta, index) => (
            <Button
              key={cta.label}
              href={cta.href}
              variant={index === 0 ? "primary" : "ghost"}
              className="sm:min-w-[170px]"
            >
              {cta.label}
            </Button>
          ))}
        </div>
      </Container>
    </section>
  );
}
