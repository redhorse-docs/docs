import { SectionShell } from "@/components/ui/section-shell";
import type { RoadmapItem } from "@/lib/types/landing";
import { cn } from "@/lib/utils/cn";

type RoadmapSectionProps = {
  title: string;
  description: string;
  items: RoadmapItem[];
};

const statusStyles: Record<RoadmapItem["status"], string> = {
  done: "bg-emerald-500/20 text-emerald-300",
  "in-progress": "bg-amber-500/20 text-amber-200",
  planned: "bg-white/10 text-white/80",
};

export function RoadmapSection({
  title,
  description,
  items,
}: RoadmapSectionProps) {
  const rowVariants = [
    "border-white/20 bg-gradient-to-r from-[rgba(224,50,58,0.16)] via-white/5 to-transparent",
    "border-white/15 bg-gradient-to-r from-[rgba(106,94,251,0.16)] via-white/5 to-transparent",
  ];
  return (
    <SectionShell
      id="roadmap"
      eyebrow="Roadmap"
      title={title}
      description={description}
    >
      <div className="space-y-6">
        {items.map((item, index) => (
          <article
            key={item.title}
            className={cn(
              "flex flex-col gap-4 rounded-3xl border p-6 shadow-[0_20px_45px_rgba(2,4,12,0.35)] md:flex-row md:items-center md:gap-8",
              rowVariants[index % rowVariants.length],
            )}
          >
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
              {item.quarter}
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-heading text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="font-serif text-sm text-white/75">
                {item.description}
              </p>
            </div>
            <span
              className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold ${statusStyles[item.status]}`}
            >
              {item.status.replace("-", " ")}
            </span>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
