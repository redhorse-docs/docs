"use client";

import type { ProcessStep } from "@/lib/types/landing";
import { SectionShell } from "@/components/ui/section-shell";
import { PlaceholderIcon } from "@/components/ui/placeholder-icon";
import { StaggerContainer, StaggerItem, motion } from "@/components/ui/motion";
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
    "from-[rgba(224,50,58,0.28)] via-white/5 to-transparent border-white/25 hover:border-[--rh-primary]/60",
    "from-[rgba(106,94,251,0.18)] via-white/5 to-transparent border-white/15 hover:border-[--rh-secondary]/60",
    "from-white/12 via-white/5 to-transparent border-white/10 hover:border-white/40",
  ];
  return (
    <SectionShell
      id="how"
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      <div className="relative">
        {/* Animated connection line */}
        <motion.div
          className="pointer-events-none absolute left-12 right-12 top-20 hidden h-px md:block lg:top-24"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          style={{ originX: 0 }}
        >
          <div className="h-full w-full bg-gradient-to-r from-[--rh-primary]/50 via-white/30 to-[--rh-secondary]/50" />
        </motion.div>

        <StaggerContainer className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <StaggerItem key={step.name}>
              <article
                className={cn(
                  "group relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border bg-gradient-to-b p-8 shadow-[0_25px_55px_rgba(2,4,12,0.4)] backdrop-blur-sm transition-all duration-300 md:p-10",
                  "hover:-translate-y-2 hover:shadow-[0_35px_70px_rgba(2,4,12,0.55)]",
                  stepVariants[index % stepVariants.length],
                )}
              >
                <span className="absolute inset-0 opacity-70 transition duration-500 group-hover:opacity-100">
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(224,50,58,0.2),_transparent_65%)]" />
                </span>
                <div className="relative flex items-center gap-5">
                  <span className="text-6xl font-black text-white/10 transition-colors duration-300 group-hover:text-white/20 md:text-7xl">
                    0{index + 1}
                  </span>
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    <PlaceholderIcon name={step.icon} className="h-12 w-12 md:h-14 md:w-14" />
                  </div>
                </div>
                <p className="relative text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                  Mechanism
                </p>
                <h3 className="font-heading relative text-2xl font-semibold text-white md:text-3xl">
                  {step.name}
                </h3>
                <p className="font-serif relative text-base leading-relaxed text-white/80 md:text-lg">
                  {step.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionShell>
  );
}
