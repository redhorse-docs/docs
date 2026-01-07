import type { MembershipTier } from "@/lib/types/landing";
import { SectionShell } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";

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
  return (
    <SectionShell
      id="membership"
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <article
            key={tier.name}
            className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.05] p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
              {tier.featured && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  Featured
                </span>
              )}
            </div>
            <ul className="space-y-3 text-sm leading-relaxed text-white/80">
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
            <Button variant={tier.featured ? "primary" : "ghost"}>
              {tier.ctaLabel}
            </Button>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
