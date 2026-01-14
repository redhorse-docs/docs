import type { MembershipTier } from "@/lib/types/landing";
import { SectionShell } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type MembershipSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  tiers: MembershipTier[];
};

export function MembershipTiersSection({
  eyebrow = "Membership",
  title,
  description,
  tiers,
}: MembershipSectionProps) {
  const tierVariants = [
    "border-white/15 bg-gradient-to-br from-[rgba(224,50,58,0.18)] via-white/5 to-transparent",
    "border-white/15 bg-gradient-to-br from-[rgba(106,94,251,0.2)] via-white/5 to-transparent",
    "border-white/10 bg-gradient-to-br from-white/12 via-white/5 to-transparent",
  ];
  return (
    <SectionShell
      id="membership"
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier, index) => {
          const isFeatured = tier.featured;
          return (
            <article
              key={tier.name}
              className={cn(
                "relative flex flex-col gap-6 overflow-hidden rounded-3xl border p-6 shadow-[0_25px_55px_rgba(2,4,12,0.45)] transition-transform",
                isFeatured
                  ? "border-white/30 bg-gradient-to-br from-[rgba(224,50,58,0.35)] via-[rgba(106,94,251,0.25)] to-transparent md:-translate-y-2"
                  : tierVariants[index % tierVariants.length],
              )}
            >
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)] opacity-70" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Tier 0{index + 1}
                  </p>
                  <h3 className="font-heading mt-1 text-xl font-semibold text-white">
                    {tier.name}
                  </h3>
                </div>
                {isFeatured ? (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    Featured
                  </span>
                ) : (
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                    Access
                  </span>
                )}
              </div>
              <ul className="relative space-y-3 text-sm leading-relaxed text-white/80 font-serif">
                {tier.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2 text-left leading-6"
                  >
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <Button variant={isFeatured ? "primary" : "secondary"}>
                {tier.ctaLabel}
              </Button>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
