import { SectionShell } from "@/components/ui/section-shell";
import { Button } from "@/components/ui/button";
import type { CommunityChannel } from "@/lib/types/landing";

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
            <div>
              <h3 className="text-lg font-semibold text-white">
                {channel.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">
                {channel.description}
              </p>
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
