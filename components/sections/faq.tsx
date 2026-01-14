"use client";

import { useState } from "react";
import { SectionShell } from "@/components/ui/section-shell";
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
    "border-white/15 bg-gradient-to-br from-[rgba(224,50,58,0.14)] via-white/5 to-transparent",
    "border-white/15 bg-gradient-to-br from-[rgba(106,94,251,0.12)] via-white/5 to-transparent",
  ];

  return (
    <SectionShell id="faq" eyebrow="FAQ" title={title} description={description}>
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <article
              key={item.question}
              className={cn(
                "rounded-3xl border shadow-[0_15px_40px_rgba(2,4,12,0.3)]",
                cardVariants[index % cardVariants.length],
              )}
            >
              <button
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-white"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span className="font-heading text-base font-semibold">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-sm transition-transform",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <div className="font-serif px-6 pb-6 text-sm text-white/70">
                  {item.answer}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
