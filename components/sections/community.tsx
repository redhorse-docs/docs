import Image from "next/image";
import { SectionShell } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";
import type { CommunityChannel } from "@/lib/types/landing";
import { PlaceholderIcon } from "@/components/ui/placeholder-icon";

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
        {channels.map((channel) => (
          <article
            key={channel.title}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            {channel.image ? (
              <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={channel.image}
                  alt={`${channel.title} preview`}
                  fill
                  sizes="(min-width: 768px) 300px, 100vw"
                  className="object-cover object-center opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-gradient-to-br from-white/5 to-white/0">
                <PlaceholderIcon name={channel.icon} className="h-16 w-16" />
              </div>
            )}
            <div className="flex items-center gap-3">
              <PlaceholderIcon name={channel.icon} className="h-10 w-10" />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {channel.title}
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  {channel.description}
                </p>
              </div>
            </div>
            <Button variant="ghost" className="mt-auto">
              {channel.action}
            </Button>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
