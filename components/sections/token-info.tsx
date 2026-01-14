import { SectionShell } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";
import type { TokenSnapshot } from "@/lib/types/landing";
import { PlaceholderIcon } from "@/components/ui/placeholder-icon";
import { cn } from "@/lib/utils/cn";

type TokenInfoProps = TokenSnapshot;

export function TokenInfoSection({
  contract,
  metrics,
  allocation,
  links,
}: TokenInfoProps) {
  const allocationVariants = [
    "border-white/15 bg-gradient-to-br from-[rgba(224,50,58,0.18)] via-white/5 to-transparent",
    "border-white/15 bg-gradient-to-br from-[rgba(106,94,251,0.16)] via-white/5 to-transparent",
    "border-white/10 bg-gradient-to-br from-white/12 via-white/5 to-transparent",
  ];
  return (
    <SectionShell
      id="token"
      eyebrow="Token"
      title="Token Snapshot"
      description="Placeholder stats and allocation blocks ensure the layout holds before live data."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="rounded-3xl border border-white/20 bg-gradient-to-br from-[rgba(224,50,58,0.28)] via-white/5 to-transparent p-6 shadow-[0_30px_65px_rgba(2,4,12,0.45)]">
          <div className="flex items-center gap-3">
            <PlaceholderIcon name="stack" className="h-10 w-10" />
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              {contract.label}
            </p>
          </div>
          <p className="mt-4 font-mono text-lg text-white">{contract.address}</p>
          <p className="font-serif mt-2 text-sm text-white/65">
            {contract.helper}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="ghost" className="px-4 py-2 text-sm">
              Copy
            </Button>
            {links.map((link) => (
              <Button
                key={link.label}
                variant="subtle"
                className="px-4 py-2 text-sm"
                href={link.href}
              >
                {link.label}
              </Button>
            ))}
          </div>
        </article>
        <article className="rounded-3xl border border-white/15 bg-gradient-to-br from-[rgba(106,94,251,0.2)] via-white/5 to-transparent p-6 shadow-[0_30px_65px_rgba(2,4,12,0.35)]">
          <h3 className="font-heading text-base font-semibold text-white">
            Metrics
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {metric.label}
                </p>
                <p className="font-heading mt-2 text-lg font-semibold text-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>
      <div className="mt-6 rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_30px_65px_rgba(2,4,12,0.35)]">
        <h3 className="font-heading text-base font-semibold text-white">
          Allocation
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {allocation.map((chunk, index) => (
            <div
              key={chunk.label}
              className={cn(
                "rounded-2xl border p-4",
                allocationVariants[index % allocationVariants.length],
              )}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                {chunk.label}
              </p>
              <p className="font-heading mt-2 text-xl font-semibold text-white">
                {chunk.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
