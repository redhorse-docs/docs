import { SectionShell } from "@/components/ui/section-shell";
import { PlaceholderIcon } from "@/components/ui/placeholder-icon";
import type { SecurityHighlight } from "@/lib/types/landing";

type SecuritySectionProps = {
  title: string;
  description: string;
  highlights: SecurityHighlight[];
};

export function SecuritySection({
  title,
  description,
  highlights,
}: SecuritySectionProps) {
  return (
    <SectionShell
      id="security"
      eyebrow="Security"
      title={title}
      description={description}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map((highlight) => (
          <article
            key={highlight.title}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PlaceholderIcon name={highlight.icon} className="h-10 w-10" />
                <h3 className="text-lg font-semibold text-white">
                  {highlight.title}
                </h3>
              </div>
              {highlight.badge && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                  {highlight.badge}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm text-white/70">{highlight.description}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
