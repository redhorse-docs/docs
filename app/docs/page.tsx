import { getDocsContent } from "@/app/admin/docs-actions";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { PlaceholderIcon } from "@/components/ui/placeholder-icon";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DocsPage() {
  const docs = await getDocsContent();
  return (
    <div className="bg-[var(--rh-background)] py-16 text-white">
      <div className="border-b border-white/10 bg-white/5">
        <Container className="grid gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Docs
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight">
                {docs.header.title}
              </h1>
              <p className="text-base text-white/70">
                {docs.header.description}
              </p>
            </div>
            <div className="relative">
              <input
                type="search"
                placeholder={docs.header.searchPlaceholder}
                className="w-full rounded-2xl border border-white/15 bg-black/40 py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none"
              />
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                ⌕
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              {docs.header.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Quickstart
            </p>
            <h2 className="mt-3 text-xl font-semibold">
              {docs.quickstart.title}
            </h2>
            <p className="mt-2 text-sm text-white/70">
              {docs.quickstart.description}
            </p>
            <div className="mt-6 space-y-3">
              {docs.quickstart.steps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm"
                >
                  <span className="text-xs text-white/40">0{step.number}</span>
                  <p className="text-white/80">{step.text}</p>
                </div>
              ))}
            </div>
            <Button className="mt-6 w-full" href={docs.quickstart.ctaHref}>
              {docs.quickstart.ctaLabel}
            </Button>
          </div>
        </Container>
      </div>

      <Container className="mt-10 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Navigation
            </p>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
              v0.1
            </span>
          </div>
          <nav className="space-y-6 text-sm">
            {docs.nav.map((group) => (
              <div key={group.title} className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {group.title}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-white/80 hover:bg-white/10">
                        <span>{item.label}</span>
                        {item.status && (
                          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                            {item.status}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <div className="space-y-6">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="flex flex-col gap-4 border-b border-white/5 pb-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Chapter One
                </p>
                <h2 className="text-3xl font-semibold text-white">
                  {docs.article.title}
                </h2>
              </div>
              <div className="text-sm text-white/50">
                {docs.article.updated}
              </div>
            </div>
            <div className="space-y-4 pt-6 text-sm leading-relaxed text-white/80">
              {docs.article.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              {docs.article.callouts.map((callout) => (
                <div
                  key={callout.title}
                  className="rounded-2xl border border-dashed border-white/20 bg-black/40 p-4"
                >
                  <div className="flex items-center gap-3">
                    <PlaceholderIcon name="spark" className="h-10 w-10" />
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                      {callout.title}
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-white/70">
                    {callout.content}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-2">
            {docs.highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-lg font-semibold text-white">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  {highlight.description}
                </p>
                <Button variant="ghost" className="mt-4 text-sm">
                  Read
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
