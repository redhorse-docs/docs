import { SectionShell } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";
import type { TokenSnapshot } from "@/lib/types/landing";

type TokenInfoProps = TokenSnapshot;

export function TokenInfoSection({
  contract,
  metrics,
  allocation,
  links,
}: TokenInfoProps) {
  return (
    <SectionShell
      id="token"
      eyebrow="Token"
      title="Token Snapshot"
      description="Placeholder stats and allocation blocks ensure the layout holds before live data."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            {contract.label}
          </p>
          <p className="mt-4 font-mono text-lg text-white">{contract.address}</p>
          <p className="mt-2 text-sm text-white/60">{contract.helper}</p>
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
        <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-base font-semibold text-white">Metrics</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/5 bg-white/5 p-4"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {metric.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>
      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-base font-semibold text-white">Allocation</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {allocation.map((chunk) => (
            <div
              key={chunk.label}
              className="rounded-2xl border border-white/5 bg-white/5 p-4"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                {chunk.label}
              </p>
              <p className="mt-2 text-xl font-semibold text-white">
                {chunk.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
