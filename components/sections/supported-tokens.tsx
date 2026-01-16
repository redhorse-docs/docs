"use client";

import { Container } from "@/components/layout/container";
import { FadeUp } from "@/components/ui/motion";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

const tokens = [
  {
    name: "Solana",
    image: "/tokens/Solana_Camera1.png",
    imageClassName: "scale-110",
  },
  { name: "Bitcoin", image: "/tokens/Bitcoin_Camera1.png" },
  { name: "Ethereum", image: "/tokens/Ethereum_Camera1.png" },
  { name: "USDC", image: "/tokens/USDCoin_Camera1.png" },
  { name: "Tether", image: "/tokens/Tether_Camera1.png" },
  { name: "BNB", image: "/tokens/BNB_Camera1.png" },
  { name: "XRP", image: "/tokens/XRP_Camera1.png" },
  { name: "Cardano", image: "/tokens/Cardano_Camera1.png" },
  { name: "Dogecoin", image: "/tokens/Dogecoin_Camera1.png" },
  { name: "Polygon", image: "/tokens/Polygon_Camera1.png" },
  { name: "Polkadot", image: "/tokens/Polkadot_Camera1.png" },
  {
    name: "Avalanche",
    image: "/tokens/Avalanche_Camera1.png",
    imageClassName: "scale-110",
  },
];

function TokenMarquee({
  direction = "left",
  speed = 40,
}: {
  direction?: "left" | "right";
  speed?: number;
}) {
  const duplicatedTokens = [...tokens, ...tokens];

  return (
    <div className="relative flex gap-8 overflow-hidden py-4 md:gap-12">
      {/* Gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[--rh-background] to-transparent md:w-32" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[--rh-background] to-transparent md:w-32" />

      <div
        className={cn(
          "flex shrink-0 items-center gap-8 md:gap-12",
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicatedTokens.map((token, index) => (
          <div
            key={`${token.name}-${index}`}
            className="group flex shrink-0 flex-col items-center gap-3"
          >
            <div className="relative flex h-16 w-16 items-center justify-center transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
              <Image
                src={token.image}
                alt={token.name}
                width={80}
                height={80}
                className={cn(
                  "h-full w-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]",
                  token.imageClassName
                )}
              />
            </div>
            <span className="text-xs font-medium text-white/50 transition-colors group-hover:text-white/80 md:text-sm">
              {token.name}
            </span>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "flex shrink-0 items-center gap-8 md:gap-12",
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        )}
        style={{ animationDuration: `${speed}s` }}
        aria-hidden
      >
        {duplicatedTokens.map((token, index) => (
          <div
            key={`${token.name}-dup-${index}`}
            className="group flex shrink-0 flex-col items-center gap-3"
          >
            <div className="relative flex h-16 w-16 items-center justify-center transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
              <Image
                src={token.image}
                alt={token.name}
                width={80}
                height={80}
                className={cn(
                  "h-full w-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]",
                  token.imageClassName
                )}
              />
            </div>
            <span className="text-xs font-medium text-white/50 transition-colors group-hover:text-white/80 md:text-sm">
              {token.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SupportedTokensSection() {
  return (
    <section
      id="supported-tokens"
      className="relative overflow-hidden bg-[var(--rh-background)] py-16 md:py-24"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,_rgba(224,50,58,0.1),_transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,_rgba(106,94,251,0.08),_transparent_60%)] blur-3xl" />
      </div>

      <Container className="relative z-10">
        <FadeUp>
          <div className="mb-12 text-center">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 md:text-sm">
              Ecosystem
            </span>
            <h2 className="font-heading mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Supported Tokens
            </h2>
            <p className="font-serif mx-auto mt-4 max-w-2xl text-base text-white/60 md:text-lg">
              Trade and interact with major cryptocurrencies on Solana
            </p>
          </div>
        </FadeUp>
      </Container>

      <TokenMarquee direction="left" speed={50} />
      <TokenMarquee direction="right" speed={60} />
    </section>
  );
}
