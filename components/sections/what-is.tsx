import type { KeyPoint } from "@/lib/types/landing";
import { SectionShell } from "@/components/ui/section-shell";

type WhatIsProps = {
  eyebrow?: string;
  title: string;
  description: string;
  items: KeyPoint[];
};

export function WhatIsSection({
  eyebrow = "What is RH",
  title,
  description,
  items,
}: WhatIsProps) {
  return (
    <SectionShell
      id="what"
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80">
              •
            </span>
            <div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
