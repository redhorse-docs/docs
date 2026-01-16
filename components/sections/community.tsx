"use client";

import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { SectionShell } from "@/components/ui/section-shell";
import type { CommunityChannel, IconName } from "@/lib/types/landing";
import type { LucideIcon } from "lucide-react";
import {
  Coins,
  Crown,
  Layers,
  Lock,
  Orbit,
  ShieldCheck,
  Sparkles,
  Waves,
  Zap,
} from "lucide-react";
import Image from "next/image";

const iconMap: Record<IconName, LucideIcon> = {
  spark: Sparkles,
  orbit: Orbit,
  stack: Layers,
  shield: ShieldCheck,
  wave: Waves,
  bolt: Zap,
  crown: Crown,
  lock: Lock,
  coin: Coins,
};

const customIcons: Record<string, string> = {
  Telegram: "/logos_telegram.png",
  "X (Twitter)": "/line-md_twitter-filled.png",
};

type CommunitySectionProps = {
  title: string;
  description: string;
  channels: CommunityChannel[];
};

export function CommunitySection({
  title,
  description,
  channels,
}: CommunitySectionProps) {
  return (
    <SectionShell
      id="community"
      eyebrow="Community"
      title={title}
      description={description}
    >
      <StaggerContainer className="grid gap-8 md:grid-cols-2">
        {channels.map((channel) => {
          const Icon = iconMap[channel.icon ?? "spark"] ?? Sparkles;
          const customIconSrc = customIcons[channel.title];

          return (
            <StaggerItem key={channel.title}>
              <article className="group flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 transition-all duration-300 hover:border-white/25 hover:shadow-[0_30px_60px_rgba(2,4,12,0.5)] md:p-10">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-8 transition-all duration-300 group-hover:border-white/20">
                  <div className="relative flex items-center gap-5">
                    <div className="relative flex size-20 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 md:size-24">
                      <div className="absolute inset-0 rounded-2xl" />
                      {customIconSrc ? (
                        <Image
                          src={customIconSrc}
                          alt={channel.title}
                          width={48}
                          height={48}
                          className="h-10 w-10 object-contain md:h-12 md:w-12"
                        />
                      ) : (
                        <Icon
                          className="h-10 w-10 text-white md:h-12 md:w-12"
                          strokeWidth={1.6}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                        {channel.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <p className="font-serif text-base text-white/75 md:text-lg">
                  {channel.description}
                </p>
                <Button
                  variant="ghost"
                  className="mt-auto w-full justify-center border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-white/25 hover:bg-white/10 md:text-lg"
                  href={channel.href}
                >
                  {channel.action}
                </Button>
              </article>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </SectionShell>
  );
}
