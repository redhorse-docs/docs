"use client";

import type { LandingContent, MembershipTier } from "@/lib/types/landing";
import type { ReactNode } from "react";

type LandingEditorProps = {
  content: LandingContent;
  onChange: (content: LandingContent) => void;
};

export function LandingEditor({ content, onChange }: LandingEditorProps) {
  return (
    <div className="space-y-8">
      <SectionCard title="Hero">
        <TextField
          label="Title"
          value={content.hero.title}
          onChange={(value) =>
            onChange({
              ...content,
              hero: { ...content.hero, title: value },
            })
          }
        />
        <TextArea
          label="Subtitle"
          value={content.hero.subtitle}
          onChange={(value) =>
            onChange({
              ...content,
              hero: { ...content.hero, subtitle: value },
            })
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {content.hero.ctas.map((cta, index) => (
            <TextField
              key={cta.label + index}
              label={`CTA ${index + 1} Label`}
              value={cta.label}
              onChange={(value) => {
                const next = [...content.hero.ctas];
                next[index] = { ...next[index], label: value };
                onChange({
                  ...content,
                  hero: { ...content.hero, ctas: next },
                });
              }}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="What is RH">
        <TextField
          label="Section Title"
          value={content.whatIs.title}
          onChange={(value) =>
            onChange({
              ...content,
              whatIs: { ...content.whatIs, title: value },
            })
          }
        />
        <TextArea
          label="Section Description"
          value={content.whatIs.description}
          onChange={(value) =>
            onChange({
              ...content,
              whatIs: { ...content.whatIs, description: value },
            })
          }
        />
        <div className="space-y-4">
          {content.whatIs.items.map((item, index) => (
            <div
              key={item.title + index}
              className="rounded-2xl border border-white/10 p-4"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Card {index + 1}
              </p>
              <TextField
                label="Card Title"
                value={item.title}
                onChange={(value) => {
                  const items = [...content.whatIs.items];
                  items[index] = { ...items[index], title: value };
                  onChange({
                    ...content,
                    whatIs: { ...content.whatIs, items },
                  });
                }}
              />
              <TextArea
                label="Card Description"
                value={item.description}
                onChange={(value) => {
                  const items = [...content.whatIs.items];
                  items[index] = { ...items[index], description: value };
                  onChange({
                    ...content,
                    whatIs: { ...content.whatIs, items },
                  });
                }}
              />
            </div>
          ))}
        </div>
        {content.whatIs.banner && (
          <div className="rounded-2xl border border-dashed border-white/20 p-4">
            <TextField
              label="Banner Title"
              value={content.whatIs.banner.title}
              onChange={(value) =>
                onChange({
                  ...content,
                  whatIs: {
                    ...content.whatIs,
                    banner: {
                      ...content.whatIs.banner!,
                      title: value,
                    },
                  },
                })
              }
            />
            <TextArea
              label="Banner Description"
              value={content.whatIs.banner.description}
              onChange={(value) =>
                onChange({
                  ...content,
                  whatIs: {
                    ...content.whatIs,
                    banner: {
                      ...content.whatIs.banner!,
                      description: value,
                    },
                  },
                })
              }
            />
          </div>
        )}
      </SectionCard>

      <SectionCard title="How it Works">
        <TextField
          label="Section Title"
          value={content.howItWorks.title}
          onChange={(value) =>
            onChange({
              ...content,
              howItWorks: { ...content.howItWorks, title: value },
            })
          }
        />
        <TextArea
          label="Section Description"
          value={content.howItWorks.description}
          onChange={(value) =>
            onChange({
              ...content,
              howItWorks: { ...content.howItWorks, description: value },
            })
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {content.howItWorks.steps.map((step, index) => (
            <div
              key={step.name + index}
              className="rounded-2xl border border-white/10 p-4"
            >
              <TextField
                label="Step Title"
                value={step.name}
                onChange={(value) => {
                  const steps = [...content.howItWorks.steps];
                  steps[index] = { ...steps[index], name: value };
                  onChange({
                    ...content,
                    howItWorks: { ...content.howItWorks, steps },
                  });
                }}
              />
              <TextArea
                label="Step Description"
                value={step.description}
                onChange={(value) => {
                  const steps = [...content.howItWorks.steps];
                  steps[index] = { ...steps[index], description: value };
                  onChange({
                    ...content,
                    howItWorks: { ...content.howItWorks, steps },
                  });
                }}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Membership Tiers">
        <TextField
          label="Section Title"
          value={content.membership.title}
          onChange={(value) =>
            onChange({
              ...content,
              membership: { ...content.membership, title: value },
            })
          }
        />
        <TextArea
          label="Section Description"
          value={content.membership.description}
          onChange={(value) =>
            onChange({
              ...content,
              membership: { ...content.membership, description: value },
            })
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {content.membership.tiers.map((tier, index) => (
            <TierEditor
              key={tier.name + index}
              tier={tier}
              onChange={(updated) => {
                const tiers = [...content.membership.tiers];
                tiers[index] = updated;
                onChange({
                  ...content,
                  membership: { ...content.membership, tiers },
                });
              }}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Token Snapshot">
        <TextField
          label="Contract Label"
          value={content.tokenInfo.contract.label}
          onChange={(value) =>
            onChange({
              ...content,
              tokenInfo: {
                ...content.tokenInfo,
                contract: { ...content.tokenInfo.contract, label: value },
              },
            })
          }
        />
        <TextField
          label="Contract Address"
          value={content.tokenInfo.contract.address}
          onChange={(value) =>
            onChange({
              ...content,
              tokenInfo: {
                ...content.tokenInfo,
                contract: { ...content.tokenInfo.contract, address: value },
              },
            })
          }
        />
        <TextArea
          label="Helper Text"
          value={content.tokenInfo.contract.helper}
          onChange={(value) =>
            onChange({
              ...content,
              tokenInfo: {
                ...content.tokenInfo,
                contract: { ...content.tokenInfo.contract, helper: value },
              },
            })
          }
        />
      </SectionCard>

      <SectionCard title="Security Highlights">
        <TextField
          label="Section Title"
          value={content.security.title}
          onChange={(value) =>
            onChange({
              ...content,
              security: { ...content.security, title: value },
            })
          }
        />
        <TextArea
          label="Section Description"
          value={content.security.description}
          onChange={(value) =>
            onChange({
              ...content,
              security: { ...content.security, description: value },
            })
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {content.security.highlights.map((highlight, index) => (
            <div
              key={highlight.title + index}
              className="rounded-2xl border border-white/10 p-4"
            >
              <TextField
                label="Highlight Title"
                value={highlight.title}
                onChange={(value) => {
                  const highlights = [...content.security.highlights];
                  highlights[index] = { ...highlights[index], title: value };
                  onChange({
                    ...content,
                    security: { ...content.security, highlights },
                  });
                }}
              />
              <TextArea
                label="Description"
                value={highlight.description}
                onChange={(value) => {
                  const highlights = [...content.security.highlights];
                  highlights[index] = {
                    ...highlights[index],
                    description: value,
                  };
                  onChange({
                    ...content,
                    security: { ...content.security, highlights },
                  });
                }}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Roadmap">
        <TextField
          label="Section Title"
          value={content.roadmap.title}
          onChange={(value) =>
            onChange({
              ...content,
              roadmap: { ...content.roadmap, title: value },
            })
          }
        />
        <TextArea
          label="Section Description"
          value={content.roadmap.description}
          onChange={(value) =>
            onChange({
              ...content,
              roadmap: { ...content.roadmap, description: value },
            })
          }
        />
        <div className="space-y-4">
          {content.roadmap.items.map((item, index) => (
            <div
              key={item.title + index}
              className="rounded-2xl border border-white/10 p-4"
            >
              <TextField
                label="Milestone Title"
                value={item.title}
                onChange={(value) => {
                  const items = [...content.roadmap.items];
                  items[index] = { ...items[index], title: value };
                  onChange({
                    ...content,
                    roadmap: { ...content.roadmap, items },
                  });
                }}
              />
              <TextArea
                label="Description"
                value={item.description}
                onChange={(value) => {
                  const items = [...content.roadmap.items];
                  items[index] = { ...items[index], description: value };
                  onChange({
                    ...content,
                    roadmap: { ...content.roadmap, items },
                  });
                }}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Community">
        <TextField
          label="Section Title"
          value={content.community.title}
          onChange={(value) =>
            onChange({
              ...content,
              community: { ...content.community, title: value },
            })
          }
        />
        <TextArea
          label="Section Description"
          value={content.community.description}
          onChange={(value) =>
            onChange({
              ...content,
              community: { ...content.community, description: value },
            })
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {content.community.channels.map((channel, index) => (
            <div
              key={channel.title + index}
              className="rounded-2xl border border-white/10 p-4"
            >
              <TextField
                label="Channel Title"
                value={channel.title}
                onChange={(value) => {
                  const channels = [...content.community.channels];
                  channels[index] = { ...channels[index], title: value };
                  onChange({
                    ...content,
                    community: { ...content.community, channels },
                  });
                }}
              />
              <TextArea
                label="Description"
                value={channel.description}
                onChange={(value) => {
                  const channels = [...content.community.channels];
                  channels[index] = {
                    ...channels[index],
                    description: value,
                  };
                  onChange({
                    ...content,
                    community: { ...content.community, channels },
                  });
                }}
              />
              <TextField
                label="Action Label"
                value={channel.action}
                onChange={(value) => {
                  const channels = [...content.community.channels];
                  channels[index] = { ...channels[index], action: value };
                  onChange({
                    ...content,
                    community: { ...content.community, channels },
                  });
                }}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="FAQ">
        <TextField
          label="Section Title"
          value={content.faq.title}
          onChange={(value) =>
            onChange({
              ...content,
              faq: { ...content.faq, title: value },
            })
          }
        />
        <TextArea
          label="Section Description"
          value={content.faq.description}
          onChange={(value) =>
            onChange({
              ...content,
              faq: { ...content.faq, description: value },
            })
          }
        />
        <div className="space-y-4">
          {content.faq.items.map((item, index) => (
            <div
              key={item.question + index}
              className="rounded-2xl border border-white/10 p-4"
            >
              <TextField
                label="Question"
                value={item.question}
                onChange={(value) => {
                  const items = [...content.faq.items];
                  items[index] = { ...items[index], question: value };
                  onChange({
                    ...content,
                    faq: { ...content.faq, items },
                  });
                }}
              />
              <TextArea
                label="Answer"
                value={item.answer}
                onChange={(value) => {
                  const items = [...content.faq.items];
                  items[index] = { ...items[index], answer: value };
                  onChange({
                    ...content,
                    faq: { ...content.faq, items },
                  });
                }}
              />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

// 공통 컴포넌트들
type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function TextField({ label, value, onChange }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.3em] text-white/50">
        {label}
      </span>
      <input
        className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function TextArea({ label, value, onChange }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.3em] text-white/50">
        {label}
      </span>
      <textarea
        className="min-h-[96px] rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

type SectionCardProps = {
  title: string;
  children: ReactNode;
};

function SectionCard({ title, children }: SectionCardProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

type TierEditorProps = {
  tier: MembershipTier;
  onChange: (tier: MembershipTier) => void;
};

function TierEditor({ tier, onChange }: TierEditorProps) {
  return (
    <div className="rounded-2xl border border-white/10 p-4">
      <TextField
        label="Tier Name"
        value={tier.name}
        onChange={(value) => onChange({ ...tier, name: value })}
      />
      <TextField
        label="CTA Label"
        value={tier.ctaLabel}
        onChange={(value) => onChange({ ...tier, ctaLabel: value })}
      />
      <TextArea
        label="Perks (한 줄 당 하나)"
        value={tier.perks.join("\n")}
        onChange={(value) =>
          onChange({
            ...tier,
            perks: value.split("\n").map((perk) => perk.trim()).filter(Boolean),
          })
        }
      />
    </div>
  );
}

