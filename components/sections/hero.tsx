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
        <div className="relative flex w-full items-center justify-center">
          <div className="relative flex h-72 w-full max-w-xl flex-col items-center justify-center gap-6 p-6 md:h-80">
            <div className="relative flex w-full items-center justify-center">
              <div className="relative size-40 overflow-visible rounded-[28px] bg-black/30 p-6 shadow-[0_0_40px_rgba(224,50,58,0.25)] token-float-slow md:size-48">
                <span className="token-glow-ring" aria-hidden />
                <span className="token-orbit token-orbit--slow" aria-hidden />
                <span className="token-orbit token-orbit--fast" aria-hidden />
                <Image
                  src="/visual.png"
                  alt="RedHorse motion token"
                  fill
                  sizes="(min-width: 1024px) 260px, 60vw"
                  className="object-contain drop-shadow-[0_18px_40px_rgba(224,50,58,0.45)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
