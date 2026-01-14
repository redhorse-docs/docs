import type { ProcessStep } from "@/lib/types/landing";
import { SectionShell } from "@/components/ui/section-shell";
import { PlaceholderIcon } from "@/components/ui/placeholder-icon";
import { cn } from "@/lib/utils/cn";

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
  const stepVariants = [
    "from-[rgba(224,50,58,0.28)] via-white/5 to-transparent border-white/25",
    "from-[rgba(106,94,251,0.18)] via-white/5 to-transparent border-white/15",
    "from-white/12 via-white/5 to-transparent border-white/10",
  ];
  return (
    <SectionShell
      id="how"
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      <div className="relative">
        <div className="pointer-events-none absolute left-8 right-8 top-12 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:block" />
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.name}
              className={cn(
                "group relative flex flex-col gap-5 overflow-hidden rounded-3xl border bg-gradient-to-b p-6 shadow-[0_25px_55px_rgba(2,4,12,0.4)] backdrop-blur-sm",
                stepVariants[index % stepVariants.length],
              )}
            >
              <span className="absolute inset-0 opacity-70 transition duration-500 group-hover:opacity-90">
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(224,50,58,0.2),_transparent_65%)]" />
              </span>
              <div className="relative flex items-center gap-4">
                <span className="text-5xl font-black text-white/10">0{index + 1}</span>
                <PlaceholderIcon name={step.icon} className="h-10 w-10" />
              </div>
              <p className="relative text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                Mechanism
              </p>
              <h3 className="font-heading relative text-xl font-semibold text-white">
                {step.name}
              </h3>
              <p className="font-serif relative text-sm leading-relaxed text-white/80">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
