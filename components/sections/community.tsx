import { SectionShell } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";
import type { CommunityChannel } from "@/lib/types/landing";
import type { IconName } from "@/lib/types/landing";
import type { LucideIcon } from "lucide-react";
import {
  Orbit,
  Sparkles,
  Layers,
  ShieldCheck,
  Waves,
  Zap,
} from "lucide-react";

const iconMap: Record<IconName, LucideIcon> = {
  spark: Sparkles,
  orbit: Orbit,
  stack: Layers,
  shield: ShieldCheck,
  wave: Waves,
  bolt: Zap,
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
      <div className="grid gap-6 md:grid-cols-2">
        {channels.map((channel) => {
          const Icon = iconMap[channel.icon ?? "spark"] ?? Sparkles;

          return (
            <article
              key={channel.title}
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(224,50,58,0.35),_transparent_70%)] opacity-60" />
                <div className="absolute -inset-6 -z-10 bg-[conic-gradient(from_180deg,_rgba(224,50,58,0.2),_transparent_45%,_rgba(255,255,255,0.08))] blur-3xl" />
                <div className="relative flex items-center gap-4">
                  <div className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgba(224,50,58,0.95)] via-[rgba(136,63,191,0.9)] to-[rgba(60,132,255,0.9)] shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                    <div className="absolute inset-0 rounded-2xl border border-white/20" />
                    <Icon className="h-8 w-8 text-white" strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                      Signal Channel
                    </p>
                    <h3 className="text-xl font-semibold text-white">
                      {channel.title}
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/70">{channel.description}</p>
              <Button
                variant="ghost"
                className="mt-auto w-full justify-center border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                href={channel.href}
              >
                {channel.action}
              </Button>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
