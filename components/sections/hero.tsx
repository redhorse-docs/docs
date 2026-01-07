import Image from "next/image";
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
      <Container className="grid gap-12 py-24 text-white md:py-32 lg:grid-cols-[minmax(0,1fr)_0.9fr] lg:items-center">
        <div className="flex flex-col gap-6">
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
        </div>
        <div className="relative rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6">
          <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/70">
            <Image
              src="/project_wireframe.png"
              alt="RedHorse wireframe preview"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-contain object-center opacity-80"
              priority
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
            <span>Wireframe</span>
            <span>Responsive Preview</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
