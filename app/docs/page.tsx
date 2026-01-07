import { Container } from "@/components/layout/container";

export default function DocsPage() {
  return (
    <div className="bg-[var(--rh-background)] py-16 text-white">
      <Container className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4 h-4 w-2/3 rounded-full bg-white/20" />
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-3 w-full rounded-full bg-white/10" />
            ))}
          </div>
        </aside>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
          <div className="h-10 w-3/4 rounded-full bg-white/15" />
          <div className="mt-6 space-y-3">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-3 w-full rounded-full bg-white/10" />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
