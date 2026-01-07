import { SectionShell } from "@/components/ui/section-shell";
import type { RoadmapItem } from "@/lib/types/landing";

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
  return (
    <SectionShell
      id="roadmap"
      eyebrow="Roadmap"
      title={title}
      description={description}
    >
      <div className="space-y-6">
        {items.map((item) => (
          <article
            key={item.title}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:gap-8"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
              {item.quarter}
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/70">{item.description}</p>
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
