"use client";

import { SectionShell } from "@/components/ui/section-shell";
import { StaggerContainer, StaggerItem, motion } from "@/components/ui/motion";
import type { RoadmapItem } from "@/lib/types/landing";
import { CheckCircle2, Clock, Rocket } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type RoadmapSectionProps = {
  title: string;
  description: string;
  items: RoadmapItem[];
};

const statusConfig: Record<
  RoadmapItem["status"],
  { bg: string; text: string; icon: typeof CheckCircle2; glow: string }
> = {
  done: {
    bg: "bg-emerald-500/20 border-emerald-500/40",
    text: "text-emerald-400",
    icon: CheckCircle2,
    glow: "rgba(16, 185, 129, 0.4)",
  },
  "in-progress": {
    bg: "bg-amber-500/20 border-amber-500/40",
    text: "text-amber-400",
    icon: Clock,
    glow: "rgba(245, 158, 11, 0.4)",
  },
  planned: {
    bg: "bg-white/10 border-white/20",
    text: "text-white/60",
    icon: Rocket,
    glow: "rgba(255, 255, 255, 0.2)",
  },
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
      centered
    >
      <div className="relative mx-auto max-w-5xl">
        {/* Central timeline */}
        <motion.div
          className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 md:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ originY: 0 }}
        >
          <div className="h-full w-full rounded-full bg-gradient-to-b from-[--rh-primary] via-[--rh-secondary] to-white/20" />
        </motion.div>

        <StaggerContainer className="relative space-y-12 md:space-y-0">
          {items.map((item, index) => {
            const config = statusConfig[item.status];
            const Icon = config.icon;
            const isLeft = index % 2 === 0;

            return (
              <StaggerItem key={item.title}>
                <div
                  className={cn(
                    "relative flex md:items-center",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse",
                  )}
                >
                  {/* Timeline node */}
                  <motion.div
                    className="absolute left-1/2 top-8 z-10 hidden h-6 w-6 -translate-x-1/2 md:flex"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <div
                      className={cn(
                        "flex h-full w-full items-center justify-center rounded-full border-4 border-[--rh-background]",
                        config.bg,
                      )}
                      style={{ boxShadow: `0 0 20px ${config.glow}` }}
                    >
                      <div className={cn("h-3 w-3 rounded-full", config.text.replace("text-", "bg-"))} />
                    </div>
                  </motion.div>

                  {/* Content card */}
                  <div
                    className={cn(
                      "w-full md:w-[calc(50%-40px)]",
                      isLeft ? "md:pr-8" : "md:pl-8",
                    )}
                  >
                    <article
                      className={cn(
                        "group relative overflow-hidden rounded-3xl border-2 p-8 text-center transition-all duration-500 md:p-10",
                        "hover:-translate-y-2",
                        config.bg,
                      )}
                      style={{
                        boxShadow: `0 20px 50px ${config.glow}, 0 10px 30px rgba(0,0,0,0.3)`,
                      }}
                    >
                      {/* Decorative gradient */}
                      <div
                        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-50"
                        style={{ background: `radial-gradient(circle, ${config.glow}, transparent)` }}
                      />

                      {/* Icon - 중앙 상단 배치 */}
                      <div className="mb-6 flex justify-center">
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-2xl border md:h-16 md:w-16",
                            config.bg,
                          )}
                        >
                          <Icon className={cn("h-7 w-7 md:h-8 md:w-8", config.text)} />
                        </div>
                      </div>

                      {/* Quarter badge - 중앙 */}
                      <span className="font-heading mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-white/90 md:text-base">
                        {item.quarter}
                      </span>

                      {/* Title & Description - 중앙 정렬 */}
                      <h3 className="font-heading mb-4 mt-4 text-2xl font-bold text-white md:text-3xl">
                        {item.title}
                      </h3>
                      <p className="font-serif text-base leading-relaxed text-white/75 md:text-lg">
                        {item.description}
                      </p>

                      {/* Status indicator - 중앙 */}
                      <div className="mt-6 flex items-center justify-center gap-3">
                        <span className={cn("h-2 w-2 rounded-full", config.text.replace("text-", "bg-"))} />
                        <span className={cn("text-sm font-semibold uppercase tracking-wider", config.text)}>
                          {item.status.replace("-", " ")}
                        </span>
                      </div>
                    </article>
                  </div>

                  {/* Empty space for opposite side */}
                  <div className="hidden md:block md:w-[calc(50%-40px)]" />
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </SectionShell>
  );
}
