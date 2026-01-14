import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type HeroProps = {
  title: string;
  subtitle: string;
  ctas: Array<{ label: string; href: string }>;
};

export function Hero({ title, subtitle, ctas }: HeroProps) {
  return (
    <section
      id="overview"
      className="relative isolate overflow-hidden bg-[var(--rh-surface)]/90"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(224,50,58,0.35),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(106,94,251,0.18),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.06)_0%,_transparent_55%)]" />
      </div>
      <Container className="grid gap-14 py-24 text-white md:py-32 lg:grid-cols-[minmax(0,1fr)_0.9fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.45em] text-white/70">
            <span className="inline-block size-1.5 rounded-full bg-[--rh-primary]" />
            Protocol Update
          </p>
          <div className="space-y-6">
            <h1 className="font-heading text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            <p className="font-serif max-w-2xl text-lg text-white/80">
              {subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-4 text-sm sm:flex-row">
            {ctas.map((cta, index) => (
              <Button
                key={cta.label}
                href={cta.href}
                variant={index === 0 ? "primary" : "secondary"}
                className="sm:min-w-[170px]"
              >
                {cta.label}
              </Button>
            ))}
          </div>
          <div className="mt-4 grid gap-4 text-sm text-white/60 sm:grid-cols-3">
            {[
              { label: "UI-first system", value: "Layout locked" },
              { label: "Docs rail", value: "Sidebar + search" },
              { label: "Responsive", value: "Desktop → Mobile" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
              >
                <p className="text-[12px] uppercase tracking-[0.35em] text-white/45">
                  {stat.label}
                </p>
                <p className="font-heading mt-1 text-base font-semibold text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex w-full items-center justify-center">
          <div className="absolute inset-0 -z-10 opacity-70">
            <div className="absolute left-1/2 top-4 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(224,50,58,0.45),_transparent_60%)] blur-3xl" />
            <div className="absolute right-10 top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,_rgba(106,94,251,0.45),_transparent_65%)] blur-3xl" />
          </div>
          <div className="relative ">
            <div className="relative flex w-full items-center justify-center">
              <div className="relative size-40 overflow-visible rounded-[28px] bg-black/40 p-6 shadow-[0_0_40px_rgba(224,50,58,0.3)] token-float-slow md:size-48">
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
