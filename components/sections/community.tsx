"use client";

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
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

const platformStyles: Record<string, { gradient: string; glow: string; hoverBorder: string }> = {
  Telegram: {
    gradient: "from-[#0088cc]/20 via-[#0088cc]/5 to-transparent",
    glow: "rgba(0, 136, 204, 0.4)",
    hoverBorder: "hover:border-[#0088cc]/50",
  },
  "X (Twitter)": {
    gradient: "from-white/15 via-white/5 to-transparent",
    glow: "rgba(255, 255, 255, 0.3)",
    hoverBorder: "hover:border-white/40",
  },
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
      <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {channels.map((channel) => {
          const Icon = iconMap[channel.icon ?? "spark"] ?? Sparkles;
          const customIconSrc = customIcons[channel.title];
          const styles = platformStyles[channel.title] ?? platformStyles["X (Twitter)"];

          return (
            <StaggerItem key={channel.title}>
              <Link
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${styles.gradient} p-6 transition-all duration-500 ${styles.hoverBorder} hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:p-8`}
                >
                  {/* Background glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${styles.glow}, transparent 60%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col gap-5">
                    {/* Header with icon and title */}
                    <div className="flex items-center gap-4">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/15 sm:h-16 sm:w-16">
                        {customIconSrc ? (
                          <Image
                            src={customIconSrc}
                            alt={channel.title}
                            width={32}
                            height={32}
                            className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                          />
                        ) : (
                          <Icon
                            className="h-7 w-7 text-white sm:h-8 sm:w-8"
                            strokeWidth={1.5}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-semibold text-white sm:text-2xl">
                          {channel.title}
                        </h3>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                        <ArrowUpRight className="h-5 w-5 text-white/60 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-serif text-sm leading-relaxed text-white/60 sm:text-base">
                      {channel.description}
                    </p>

                    {/* Action hint */}
                    <div className="mt-auto flex items-center gap-2 pt-2">
                      <span className="text-sm font-medium text-white/80 transition-colors duration-300 group-hover:text-white">
                        {channel.action}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent transition-all duration-300 group-hover:from-white/40" />
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-white/10" />
                </article>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </SectionShell>
  );
}
