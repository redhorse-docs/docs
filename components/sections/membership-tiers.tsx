"use client";

import type { MembershipTier } from "@/lib/types/landing";
import { SectionShell } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Coins, Crown, Shield } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type MembershipSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  tiers: MembershipTier[];
};

const tierConfig = {
  bronze: {
    gradient: "from-amber-700/40 via-amber-900/20 to-transparent",
    border: "border-amber-600/40 hover:border-amber-500/60",
    glow: "rgba(180, 83, 9, 0.3)",
    icon: Coins,
    iconColor: "text-amber-400",
    badge: "bg-amber-900/50 text-amber-300 border-amber-600/30",
    accent: "bg-amber-500",
  },
  silver: {
    gradient: "from-slate-400/30 via-slate-500/15 to-transparent",
    border: "border-slate-400/40 hover:border-slate-300/60",
    glow: "rgba(148, 163, 184, 0.3)",
    icon: Shield,
    iconColor: "text-slate-300",
    badge: "bg-slate-700/50 text-slate-200 border-slate-500/30",
    accent: "bg-slate-400",
  },
  gold: {
    gradient: "from-yellow-500/40 via-amber-500/20 to-transparent",
    border: "border-yellow-500/50 hover:border-yellow-400/70",
    glow: "rgba(234, 179, 8, 0.4)",
    icon: Crown,
    iconColor: "text-yellow-400",
    badge: "bg-yellow-900/50 text-yellow-300 border-yellow-500/30",
    accent: "bg-yellow-500",
  },
};

export function MembershipTiersSection({
  eyebrow = "Membership",
  title,
  description,
  tiers,
}: MembershipSectionProps) {
  return (
    <SectionShell
      id="membership"
      eyebrow={eyebrow}
      title={title}
      description={description}
      centered
    >
      <StaggerContainer className="grid gap-8 md:grid-cols-3 lg:gap-10">
        {tiers.map((tier, index) => {
          const color = tier.color || (["bronze", "silver", "gold"][index] as "bronze" | "silver" | "gold");
          const config = tierConfig[color];
          const Icon = config.icon;
          const isGold = color === "gold";

          return (
            <StaggerItem key={tier.name}>
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 p-8 transition-all duration-500 md:p-10",
                  `bg-gradient-to-br ${config.gradient}`,
                  config.border,
                  "hover:-translate-y-3",
                )}
                style={{
                  boxShadow: `0 25px 60px ${config.glow}, 0 10px 30px rgba(0,0,0,0.4)`,
                }}
              >
                {/* Decorative corner glow */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle, ${config.glow}, transparent 70%)`,
                    opacity: isGold ? 0.8 : 0.5,
                  }}
                />

                {/* Top decoration line */}
                <div className={cn("absolute left-0 right-0 top-0 h-1", config.accent)} />

                {/* Header */}
                <div className="relative mb-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20",
                        config.badge,
                      )}
                    >
                      <Icon className={cn("h-8 w-8 md:h-10 md:w-10", config.iconColor)} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/50">
                        Tier {index + 1}
                      </p>
                      <h3 className="font-heading text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                        {tier.name}
                      </h3>
                    </div>
                  </div>
                  {isGold && (
                    <span className="sr-only">Best Value</span>
                  )}
                </div>

                {/* Price if available */}
                {tier.price && (
                  <div className="relative mb-6 border-b border-white/10 pb-6">
                    <p className="font-heading text-4xl font-bold text-white md:text-5xl">
                      {tier.price}
                    </p>
                  </div>
                )}

                {/* Perks */}
                <ul className="font-serif relative mb-8 flex-1 space-y-4">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-left">
                      <span
                        className={cn(
                          "mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs",
                          config.badge,
                        )}
                      >
                        ✓
                      </span>
                      <span className="text-base leading-relaxed text-white/85 md:text-lg">
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={isGold ? "primary" : "secondary"}
                  className={cn(
                    "w-full px-8 py-5 text-base font-bold md:text-lg",
                    isGold && "shadow-[0_10px_30px_rgba(234,179,8,0.3)]",
                  )}
                >
                  {tier.ctaLabel}
                </Button>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-center shadow-[0_20px_45px_rgba(2,4,12,0.35)] backdrop-blur md:px-10 md:py-6">
        <p className="font-serif text-base text-white/75 md:text-lg">
          Parameters, tier thresholds, and reward budgets are published and may
          be updated under governance scope.
        </p>
      </div>
    </SectionShell>
  );
}
