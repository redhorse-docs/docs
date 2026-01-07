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
      <SectionCard title="Hero" description="홈 첫 화면의 헤드라인 영역입니다.">
        <TextField
          label="Title"
          value={content.hero.title}
          placeholder="한 줄 헤드라인"
          helperText="홈 첫 화면의 가장 큰 제목입니다."
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
          placeholder="간단한 소개 문장을 입력하세요."
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
              placeholder="버튼 문구"
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

      <SectionCard
        title="What is RH"
        description="서비스를 소개하는 카드 3개 영역입니다."
      >
        <TextField
          label="Section Title"
          value={content.whatIs.title}
          placeholder="섹션 제목"
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
          placeholder="섹션을 소개하는 간단한 설명"
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
                placeholder="카드 제목"
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
                placeholder="카드 설명"
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
              placeholder="배너 제목"
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
              placeholder="배너 설명"
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

      <SectionCard
        title="How it Works"
        description="서비스 사용 흐름을 단계별로 소개합니다."
      >
        <TextField
          label="Section Title"
          value={content.howItWorks.title}
          placeholder="섹션 제목"
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
          placeholder="섹션 설명"
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
                placeholder="단계 제목"
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
                placeholder="단계 설명"
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

      <SectionCard
        title="Membership Tiers"
        description="회원 등급별 혜택을 보여주는 카드 섹션입니다."
      >
        <TextField
          label="Section Title"
          value={content.membership.title}
          placeholder="섹션 제목"
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
          placeholder="섹션 설명"
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

      <SectionCard
        title="Token Snapshot"
        description="토큰/컨트랙트 정보를 표시합니다."
      >
        <TextField
          label="Contract Label"
          value={content.tokenInfo.contract.label}
          placeholder="Contract"
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
          placeholder="0x..."
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
          placeholder="주소를 복사해서 지갑에 붙여넣으세요."
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

      <SectionCard
        title="Security Highlights"
        description="보안 관련 주요 포인트를 보여줍니다."
      >
        <TextField
          label="Section Title"
          value={content.security.title}
          placeholder="섹션 제목"
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
          placeholder="섹션 설명"
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
                placeholder="강조 제목"
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
                placeholder="설명"
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

      <SectionCard
        title="Roadmap"
        description="로드맵 타임라인 영역입니다."
      >
        <TextField
          label="Section Title"
          value={content.roadmap.title}
          placeholder="섹션 제목"
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
          placeholder="섹션 설명"
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
                placeholder="Q1 2025"
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
                placeholder="설명"
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

      <SectionCard
        title="Community"
        description="커뮤니티 채널 카드 영역입니다."
      >
        <TextField
          label="Section Title"
          value={content.community.title}
          placeholder="섹션 제목"
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
          placeholder="섹션 설명"
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
                placeholder="Discord"
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
                placeholder="채널 소개"
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
                placeholder="참여하기"
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

      <SectionCard
        title="FAQ"
        description="자주 묻는 질문과 답변을 입력합니다."
      >
        <TextField
          label="Section Title"
          value={content.faq.title}
          placeholder="섹션 제목"
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
          placeholder="섹션 설명"
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
                placeholder="자주 묻는 질문"
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
                placeholder="답변"
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
  helperText?: string;
  placeholder?: string;
};

function TextField({ label, value, onChange, placeholder, helperText }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.3em] text-white/50">
        {label}
      </span>
      <input
        className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {helperText && <p className="text-xs text-white/40">{helperText}</p>}
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder, helperText }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-xs uppercase tracking-[0.3em] text-white/50">
        {label}
      </span>
      <textarea
        className="min-h-[96px] rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {helperText && <p className="text-xs text-white/40">{helperText}</p>}
    </label>
  );
}

type SectionCardProps = {
  title: string;
  children: ReactNode;
  description?: string;
};

function SectionCard({ title, children, description }: SectionCardProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {description && <p className="text-sm text-white/60">{description}</p>}
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
        placeholder="Basic"
        onChange={(value) => onChange({ ...tier, name: value })}
      />
      <TextField
        label="CTA Label"
        value={tier.ctaLabel}
        placeholder="가입하기"
        onChange={(value) => onChange({ ...tier, ctaLabel: value })}
      />
      <TextArea
        label="Perks (한 줄 당 하나)"
        value={tier.perks.join("\n")}
        placeholder={"혜택 1\n혜택 2"}
        helperText="혜택을 한 줄씩 입력하세요."
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
