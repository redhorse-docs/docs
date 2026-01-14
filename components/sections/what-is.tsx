import type { KeyPoint } from "@/lib/types/landing";
import { SectionShell } from "@/components/ui/section-shell";
import { PlaceholderIcon } from "@/components/ui/placeholder-icon";
import { cn } from "@/lib/utils/cn";

type WhatIsProps = {
  eyebrow?: string;
  title: string;
  description: string;
  items: KeyPoint[];
  banner?: {
    title: string;
    description: string;
  };
};

export function WhatIsSection({
  eyebrow = "What is RH",
  title,
  description,
  items,
  banner,
}: WhatIsProps) {
  const cardVariants = [
    "bg-gradient-to-br from-[rgba(224,50,58,0.26)] via-white/5 to-transparent border-white/20",
    "bg-gradient-to-br from-[rgba(106,94,251,0.2)] via-white/5 to-transparent border-white/15",
    "bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/10",
  ];
  return (
    <SectionShell
      id="what"
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.title}
            className={cn(
              "flex flex-col gap-4 rounded-3xl p-6 shadow-[0_20px_45px_rgba(2,4,12,0.35)] backdrop-blur-sm",
              cardVariants[index % cardVariants.length],
            )}
          >
            <PlaceholderIcon name={item.icon} />
            <div>
              <h3 className="font-heading text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="font-serif mt-2 text-sm text-white/70">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
      {banner && (
        <div className="mt-8 rounded-3xl border border-white/20 bg-gradient-to-r from-[rgba(224,50,58,0.25)] via-[rgba(106,94,251,0.18)] to-transparent p-6 shadow-[0_25px_55px_rgba(2,4,12,0.4)] md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Snapshot
            </p>
            <h3 className="font-heading mt-2 text-xl font-semibold text-white">
              {banner.title}
            </h3>
            <p className="font-serif mt-2 text-sm text-white/70">
              {banner.description}
            </p>
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs uppercase tracking-[0.3em] text-white/70 md:mt-0">
            Layout Ready
          </div>
        </div>
      )}
    </SectionShell>
  );
}
