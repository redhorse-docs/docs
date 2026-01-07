import type { ProcessStep } from "@/lib/types/landing";
import { SectionShell } from "@/components/ui/section-shell";
import { PlaceholderIcon } from "@/components/ui/placeholder-icon";

type HowItWorksProps = {
  eyebrow?: string;
  title: string;
  description: string;
  steps: ProcessStep[];
};

export function HowItWorksSection({
  eyebrow = "How it works",
  title,
  description,
  steps,
}: HowItWorksProps) {
  return (
    <SectionShell
      id="how"
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <article
            key={step.name}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          >
            <PlaceholderIcon name={step.icon} className="h-10 w-10" />
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Step {index + 1}
            </p>
            <h3 className="text-xl font-semibold text-white">{step.name}</h3>
            <p className="text-sm text-white/70">{step.description}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
