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
  return (
    <SectionShell id="faq" eyebrow="FAQ" title={title} description={description}>
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <article
              key={item.question}
              className="rounded-3xl border border-white/10 bg-white/5"
            >
              <button
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-white"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span className="text-base font-medium">{item.question}</span>
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
                <div className="px-6 pb-6 text-sm text-white/70">
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
