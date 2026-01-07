"use client";

import {
  getLandingContent,
  resetLandingContent,
  saveLandingContent,
} from "@/app/admin/actions";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { landingMock } from "@/lib/data/landing.mock";
import type { LandingContent, MembershipTier } from "@/lib/types/landing";
import { useEffect, useState, useTransition, type ReactNode } from "react";

export default function AdminPage() {
  const [content, setContent] = useState<LandingContent>(landingMock);
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // DB를 이용해서 데이터 로딩
  useEffect(() => {
    async function loadContent() {
      try {
        const data = await getLandingContent();
        setContent(data);
      } catch (error) {
        console.error("Failed to load landing content from database", error);
        setStatus("데이터 로딩에 실패했습니다. 기본값으로 설정합니다.");
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, []);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   const stored = window.localStorage.getItem(STORAGE_KEY);
  //   if (stored) {
  //     try {
  //       // eslint-disable-next-line react-hooks/set-state-in-effect
  //       setContent(JSON.parse(stored) as LandingContent);
  //     } catch {
  //       window.localStorage.removeItem(STORAGE_KEY);
  //     }
  //   }
  // }, []);

  const flashStatus = (message: string) => {
    setStatus(message);
    setTimeout(() => setStatus(""), 2500);
  };

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveLandingContent(content);
      flashStatus(result.message);
    });
  };

  const handleReset = () => {
    startTransition(async () => {
      const result = await resetLandingContent();
      if (result.success) {
        setContent(result.content);
      }
      flashStatus(result.message);
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(content, null, 2));
      flashStatus("JSON을 클립보드에 복사했습니다.");
    } catch {
      flashStatus("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[var(--rh-background)] py-12 text-white">
        <Container>
          <p className="text-sm text-white/70">데이터를 불러오는 중...</p>
        </Container>
      </div>
    );
  }
  return (
    <div className="bg-[var(--rh-background)] py-12 text-white">
      <Container className="space-y-8">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            Admin Mode
          </p>
          <h1 className="text-3xl font-semibold">Landing Copy Editor</h1>
          <p className="text-sm text-white/70">
            각 입력 필드를 수정한 뒤 &ldquo;변경 저장&rdquo;을 누르면
            데이터베이스에 내용이 반영됩니다. 메인 페이지(`/`)를 새로고침하면
            저장된 문자열로 즉시 미리볼 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? "저장 중..." : "변경 저장"}
            </Button>
            <Button variant="ghost" onClick={handleCopy} disabled={isPending}>
              JSON 복사
            </Button>
            <Button variant="ghost" onClick={handleReset} disabled={isPending}>
              기본값으로 초기화
            </Button>
          </div>
          {status && (
            <p className="text-sm text-emerald-300" role="status">
              {status}
            </p>
          )}
        </header>

        <SectionCard title="Hero">
          <TextField
            label="Title"
            value={content.hero.title}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                hero: { ...prev.hero, title: value },
              }))
            }
          />
          <TextArea
            label="Subtitle"
            value={content.hero.subtitle}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                hero: { ...prev.hero, subtitle: value },
              }))
            }
          />
          <div className="grid gap-4 md:grid-cols-2">
            {content.hero.ctas.map((cta, index) => (
              <TextField
                key={cta.label + index}
                label={`CTA ${index + 1} Label`}
                value={cta.label}
                onChange={(value) =>
                  setContent((prev) => {
                    const next = [...prev.hero.ctas];
                    next[index] = { ...next[index], label: value };
                    return { ...prev, hero: { ...prev.hero, ctas: next } };
                  })
                }
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="What is RH">
          <TextField
            label="Section Title"
            value={content.whatIs.title}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                whatIs: { ...prev.whatIs, title: value },
              }))
            }
          />
          <TextArea
            label="Section Description"
            value={content.whatIs.description}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                whatIs: { ...prev.whatIs, description: value },
              }))
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
                  onChange={(value) =>
                    setContent((prev) => {
                      const items = [...prev.whatIs.items];
                      items[index] = { ...items[index], title: value };
                      return { ...prev, whatIs: { ...prev.whatIs, items } };
                    })
                  }
                />
                <TextArea
                  label="Card Description"
                  value={item.description}
                  onChange={(value) =>
                    setContent((prev) => {
                      const items = [...prev.whatIs.items];
                      items[index] = { ...items[index], description: value };
                      return { ...prev, whatIs: { ...prev.whatIs, items } };
                    })
                  }
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
                  setContent((prev) => ({
                    ...prev,
                    whatIs: {
                      ...prev.whatIs,
                      banner: {
                        ...prev.whatIs.banner!,
                        title: value,
                      },
                    },
                  }))
                }
              />
              <TextArea
                label="Banner Description"
                value={content.whatIs.banner.description}
                onChange={(value) =>
                  setContent((prev) => ({
                    ...prev,
                    whatIs: {
                      ...prev.whatIs,
                      banner: {
                        ...prev.whatIs.banner!,
                        description: value,
                      },
                    },
                  }))
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
              setContent((prev) => ({
                ...prev,
                howItWorks: { ...prev.howItWorks, title: value },
              }))
            }
          />
          <TextArea
            label="Section Description"
            value={content.howItWorks.description}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                howItWorks: { ...prev.howItWorks, description: value },
              }))
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
                  onChange={(value) =>
                    setContent((prev) => {
                      const steps = [...prev.howItWorks.steps];
                      steps[index] = { ...steps[index], name: value };
                      return {
                        ...prev,
                        howItWorks: { ...prev.howItWorks, steps },
                      };
                    })
                  }
                />
                <TextArea
                  label="Step Description"
                  value={step.description}
                  onChange={(value) =>
                    setContent((prev) => {
                      const steps = [...prev.howItWorks.steps];
                      steps[index] = { ...steps[index], description: value };
                      return {
                        ...prev,
                        howItWorks: { ...prev.howItWorks, steps },
                      };
                    })
                  }
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
              setContent((prev) => ({
                ...prev,
                membership: { ...prev.membership, title: value },
              }))
            }
          />
          <TextArea
            label="Section Description"
            value={content.membership.description}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                membership: { ...prev.membership, description: value },
              }))
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {content.membership.tiers.map((tier, index) => (
              <TierEditor
                key={tier.name + index}
                tier={tier}
                onChange={(updated) =>
                  setContent((prev) => {
                    const tiers = [...prev.membership.tiers];
                    tiers[index] = updated;
                    return {
                      ...prev,
                      membership: { ...prev.membership, tiers },
                    };
                  })
                }
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Token Snapshot">
          <TextField
            label="Contract Label"
            value={content.tokenInfo.contract.label}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                tokenInfo: {
                  ...prev.tokenInfo,
                  contract: { ...prev.tokenInfo.contract, label: value },
                },
              }))
            }
          />
          <TextField
            label="Contract Address"
            value={content.tokenInfo.contract.address}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                tokenInfo: {
                  ...prev.tokenInfo,
                  contract: { ...prev.tokenInfo.contract, address: value },
                },
              }))
            }
          />
          <TextArea
            label="Helper Text"
            value={content.tokenInfo.contract.helper}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                tokenInfo: {
                  ...prev.tokenInfo,
                  contract: { ...prev.tokenInfo.contract, helper: value },
                },
              }))
            }
          />
        </SectionCard>

        <SectionCard title="Security Highlights">
          <TextField
            label="Section Title"
            value={content.security.title}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                security: { ...prev.security, title: value },
              }))
            }
          />
          <TextArea
            label="Section Description"
            value={content.security.description}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                security: { ...prev.security, description: value },
              }))
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
                  onChange={(value) =>
                    setContent((prev) => {
                      const highlights = [...prev.security.highlights];
                      highlights[index] = {
                        ...highlights[index],
                        title: value,
                      };
                      return {
                        ...prev,
                        security: { ...prev.security, highlights },
                      };
                    })
                  }
                />
                <TextArea
                  label="Description"
                  value={highlight.description}
                  onChange={(value) =>
                    setContent((prev) => {
                      const highlights = [...prev.security.highlights];
                      highlights[index] = {
                        ...highlights[index],
                        description: value,
                      };
                      return {
                        ...prev,
                        security: { ...prev.security, highlights },
                      };
                    })
                  }
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
              setContent((prev) => ({
                ...prev,
                roadmap: { ...prev.roadmap, title: value },
              }))
            }
          />
          <TextArea
            label="Section Description"
            value={content.roadmap.description}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                roadmap: { ...prev.roadmap, description: value },
              }))
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
                  onChange={(value) =>
                    setContent((prev) => {
                      const items = [...prev.roadmap.items];
                      items[index] = { ...items[index], title: value };
                      return { ...prev, roadmap: { ...prev.roadmap, items } };
                    })
                  }
                />
                <TextArea
                  label="Description"
                  value={item.description}
                  onChange={(value) =>
                    setContent((prev) => {
                      const items = [...prev.roadmap.items];
                      items[index] = { ...items[index], description: value };
                      return { ...prev, roadmap: { ...prev.roadmap, items } };
                    })
                  }
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
              setContent((prev) => ({
                ...prev,
                community: { ...prev.community, title: value },
              }))
            }
          />
          <TextArea
            label="Section Description"
            value={content.community.description}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                community: { ...prev.community, description: value },
              }))
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
                  onChange={(value) =>
                    setContent((prev) => {
                      const channels = [...prev.community.channels];
                      channels[index] = { ...channels[index], title: value };
                      return {
                        ...prev,
                        community: { ...prev.community, channels },
                      };
                    })
                  }
                />
                <TextArea
                  label="Description"
                  value={channel.description}
                  onChange={(value) =>
                    setContent((prev) => {
                      const channels = [...prev.community.channels];
                      channels[index] = {
                        ...channels[index],
                        description: value,
                      };
                      return {
                        ...prev,
                        community: { ...prev.community, channels },
                      };
                    })
                  }
                />
                <TextField
                  label="Action Label"
                  value={channel.action}
                  onChange={(value) =>
                    setContent((prev) => {
                      const channels = [...prev.community.channels];
                      channels[index] = { ...channels[index], action: value };
                      return {
                        ...prev,
                        community: { ...prev.community, channels },
                      };
                    })
                  }
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
              setContent((prev) => ({
                ...prev,
                faq: { ...prev.faq, title: value },
              }))
            }
          />
          <TextArea
            label="Section Description"
            value={content.faq.description}
            onChange={(value) =>
              setContent((prev) => ({
                ...prev,
                faq: { ...prev.faq, description: value },
              }))
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
                  onChange={(value) =>
                    setContent((prev) => {
                      const items = [...prev.faq.items];
                      items[index] = { ...items[index], question: value };
                      return { ...prev, faq: { ...prev.faq, items } };
                    })
                  }
                />
                <TextArea
                  label="Answer"
                  value={item.answer}
                  onChange={(value) =>
                    setContent((prev) => {
                      const items = [...prev.faq.items];
                      items[index] = { ...items[index], answer: value };
                      return { ...prev, faq: { ...prev.faq, items } };
                    })
                  }
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </Container>
    </div>
  );
}

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
            perks: value
              .split("\n")
              .map((perk) => perk.trim())
              .filter(Boolean),
          })
        }
      />
    </div>
  );
}
