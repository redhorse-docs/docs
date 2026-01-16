"use client";

import { useState } from "react";
import { SectionShell } from "@/components/ui/section-shell";
import { StaggerContainer, StaggerItem, motion } from "@/components/ui/motion";
import { AnimatePresence } from "framer-motion";
import type { FaqItem } from "@/lib/types/landing";
import { cn } from "@/lib/utils/cn";

type FaqSectionProps = {
  title: string;
  description: string;
  items: FaqItem[];
};

export function FaqSection({ title, description, items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const cardVariants = [
    "border-white/15 bg-gradient-to-br from-[rgba(224,50,58,0.14)] via-white/5 to-transparent hover:border-[--rh-primary]/40",
    "border-white/15 bg-gradient-to-br from-[rgba(106,94,251,0.12)] via-white/5 to-transparent hover:border-[--rh-secondary]/40",
  ];

  return (
    <SectionShell id="faq" eyebrow="FAQ" title={title} description={description}>
      <StaggerContainer className="space-y-5">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <StaggerItem key={item.question}>
              <article
                className={cn(
                  "rounded-3xl border shadow-[0_15px_40px_rgba(2,4,12,0.3)] transition-all duration-300",
                  isOpen && "shadow-[0_25px_55px_rgba(2,4,12,0.45)]",
                  cardVariants[index % cardVariants.length],
                )}
              >
                <button
                  className="flex w-full items-center justify-between gap-6 px-8 py-6 text-left text-white md:px-10 md:py-8"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="font-heading text-lg font-semibold md:text-xl lg:text-2xl">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg transition-all duration-300 md:h-12 md:w-12 md:text-xl",
                      isOpen ? "rotate-45 border-white/30 bg-white/10" : "hover:border-white/30 hover:bg-white/5",
                    )}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="font-serif px-8 pb-8 text-base leading-relaxed text-white/70 md:px-10 md:pb-10 md:text-lg">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </SectionShell>
  );
}
