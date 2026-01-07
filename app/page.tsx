import { Hero } from "@/components/sections/hero";
import { SectionShell } from "@/components/ui/section-shell";
import { landingMock } from "@/lib/data/landing.mock";

const placeholderCard =
  "rounded-2xl border border-white/10 bg-white/5 p-6 text-white/60";

export default function Home() {
  return (
    <div className="bg-[var(--rh-background)] text-white">
      <Hero {...landingMock.hero} />

      <SectionShell
        id="what"
        eyebrow="What is RH"
        title="Three blocks to articulate the value prop"
        description="Use this area to lock spacing, card gutters, and responsive flow. Copy will be swapped later."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className={placeholderCard}>
              <div className="mb-4 h-10 w-10 rounded-full bg-white/10" />
              <div className="h-4 w-3/4 rounded-full bg-white/20" />
              <div className="mt-3 h-3 w-full rounded-full bg-white/10" />
              <div className="mt-2 h-3 w-4/5 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="how"
        eyebrow="How It Works"
        title="Three step process"
        description="Each card locks the columns and ensures content stays balanced on tablet/mobile."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className={placeholderCard}>
              <p className="text-sm text-white/40">Step {index + 1}</p>
              <div className="mt-3 h-4 w-2/3 rounded-full bg-white/20" />
              <div className="mt-2 h-3 w-full rounded-full bg-white/10" />
              <div className="mt-2 h-3 w-4/5 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="membership"
        eyebrow="Membership Tiers"
        title="Tier grid placeholder"
        description="This grid keeps cards aligned with equal height CTAs."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 rounded-full bg-white/20" />
                {index === 1 && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                    Featured
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {[...Array(3)].map((item) => (
                  <div key={item} className="h-3 rounded-full bg-white/10" />
                ))}
              </div>
              <div className="mt-auto h-10 rounded-full bg-white/15" />
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="token"
        eyebrow="Token Info"
        title="Snapshot cards"
        description="Lock contract, allocation, and chain detail spacing."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={placeholderCard}>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Contract
            </p>
            <div className="mt-3 h-4 w-3/4 rounded bg-white/15" />
            <div className="mt-4 h-10 w-32 rounded-full bg-white/15" />
          </div>
          <div className={placeholderCard}>
            <div className="h-4 w-32 rounded-full bg-white/20" />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-16 rounded-2xl bg-white/5" />
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        id="security"
        eyebrow="Security"
        title="Audit and controls"
        description="Three highlight cards anchor this section."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className={placeholderCard}>
              <div className="h-4 w-1/2 rounded-full bg-white/20" />
              <div className="mt-3 space-y-2">
                {[...Array(3)].map((item) => (
                  <div key={item} className="h-3 rounded-full bg-white/10" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="roadmap"
        eyebrow="Roadmap"
        title="Timeline blocks"
        description="Vertical layout ensures future timeline items fit."
      >
        <div className="space-y-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:gap-8"
            >
              <div className="w-24 text-sm font-semibold text-white">Q{index + 1}</div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/2 rounded-full bg-white/20" />
                <div className="h-3 w-full rounded-full bg-white/10" />
                <div className="h-3 w-4/5 rounded-full bg-white/10" />
              </div>
              <div className="h-8 w-24 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="community"
        eyebrow="Community"
        title="Links and channels"
        description="Placeholder cards keep spacing ready for real community links."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="h-4 w-1/3 rounded-full bg-white/20" />
              <div className="space-y-2">
                {[...Array(3)].map((item) => (
                  <div key={item} className="h-3 w-5/6 rounded-full bg-white/10" />
                ))}
              </div>
              <div className="mt-auto h-10 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="faq"
        eyebrow="FAQ"
        title="Accordion placeholder"
        description="Accordion component will mount here later."
      >
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between text-white">
                <div className="h-4 w-2/3 rounded-full bg-white/20" />
                <div className="h-6 w-6 rounded-full bg-white/10" />
              </div>
              <div className="mt-3 h-3 w-full rounded-full bg-white/10" />
              <div className="mt-2 h-3 w-5/6 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
