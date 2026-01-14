"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { FadeUp, ScaleUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";
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
      className="relative isolate min-h-[90vh] overflow-hidden bg-[var(--rh-surface)]/90 lg:min-h-screen"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(224,50,58,0.35),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(106,94,251,0.18),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.06)_0%,_transparent_55%)]" />
      </div>
      <Container className="grid min-h-[90vh] gap-16 py-28 text-white md:py-36 lg:min-h-screen lg:grid-cols-[minmax(0,1fr)_0.85fr] lg:items-center lg:py-20">
        <div className="flex flex-col gap-8">
          <FadeUp>
            <div className="space-y-8">
              <h1 className="font-heading text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
              <p className="font-serif max-w-2xl text-xl leading-relaxed text-white/80 md:text-2xl">
                {subtitle}
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="flex flex-col gap-5 sm:flex-row">
              {ctas.map((cta, index) => (
                <Button
                  key={cta.label}
                  href={cta.href}
                  variant={index === 0 ? "primary" : "ghost"}
                  className={
                    index === 0
                      ? "btn-glow px-10 py-5 text-base sm:min-w-[220px] md:text-lg"
                      : "px-10 py-5 text-base sm:min-w-[220px] md:text-lg"
                  }
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          </FadeUp>
          <StaggerContainer className="mt-6 grid gap-5 sm:grid-cols-3" delay={0.3}>
            {[
              { label: "UI-first system", value: "Layout locked" },
              { label: "Docs rail", value: "Sidebar + search" },
              { label: "Responsive", value: "Desktop → Mobile" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="group rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/10 md:px-6 md:py-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/45 md:text-sm">
                    {stat.label}
                  </p>
                  <p className="font-heading mt-2 text-lg font-semibold text-white md:text-xl">
                    {stat.value}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
        <ScaleUp delay={0.15}>
          <div className="relative flex w-full items-center justify-center">
            <div className="absolute inset-0 -z-10 opacity-70">
              <div className="absolute left-1/2 top-4 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(224,50,58,0.45),_transparent_60%)] blur-3xl md:h-96 md:w-96" />
              <div className="absolute right-10 top-16 h-60 w-60 rounded-full bg-[radial-gradient(circle,_rgba(106,94,251,0.45),_transparent_65%)] blur-3xl md:h-72 md:w-72" />
            </div>
            {/* Floating tokens */}
            <div className="pointer-events-none absolute inset-0 hidden md:block">
              <Image
                src="/tokens/Solana_Camera1.png"
                alt="Solana"
                width={72}
                height={72}
                className="token-float-slow absolute -left-4 top-1/4 drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                style={{ animationDelay: "0s" }}
              />
              <Image
                src="/tokens/Ethereum_Camera1.png"
                alt="Ethereum"
                width={56}
                height={56}
                className="token-float-slow absolute -right-2 top-1/3 drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                style={{ animationDelay: "1.2s" }}
              />
              <Image
                src="/tokens/Bitcoin_Camera1.png"
                alt="Bitcoin"
                width={48}
                height={48}
                className="token-float-slow absolute bottom-1/4 left-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                style={{ animationDelay: "2.4s" }}
              />
              <Image
                src="/tokens/USDCoin_Camera1.png"
                alt="USDC"
                width={44}
                height={44}
                className="token-float-slow absolute -right-4 bottom-1/3 drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                style={{ animationDelay: "0.8s" }}
              />
              <Image
                src="/tokens/Tether_Camera1.png"
                alt="Tether"
                width={40}
                height={40}
                className="token-float-slow absolute left-8 top-0 drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                style={{ animationDelay: "1.8s" }}
              />
            </div>
            <div className="relative">
              <div className="relative flex w-full items-center justify-center">
                <div className="token-float-slow relative size-52 overflow-visible rounded-[32px] bg-black/40 p-8 shadow-[0_0_60px_rgba(224,50,58,0.35)] md:size-64 lg:size-72">
                  <span className="token-glow-ring" aria-hidden />
                  <span className="token-orbit token-orbit--slow" aria-hidden />
                  <span className="token-orbit token-orbit--fast" aria-hidden />
                  <Image
                    src="/visual.png"
                    alt="RedHorse motion token"
                    fill
                    sizes="(min-width: 1024px) 320px, 60vw"
                    className="object-contain drop-shadow-[0_18px_40px_rgba(224,50,58,0.45)]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </ScaleUp>
      </Container>
    </section>
  );
}
