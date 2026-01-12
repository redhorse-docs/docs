import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function LaunchAppPage() {
  return (
    <section className="bg-[var(--rh-surface)] py-24 text-white">
      <Container className="max-w-xl space-y-10">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">
            Launch App
          </p>
          <h1 className="text-3xl font-semibold">Sign in to RedHorse Console</h1>
          <p className="text-sm text-white/70">
            Use your membership credentials to continue. Access controls are
            still in beta and multi-factor verification will be added soon.
          </p>
        </div>
        <form className="space-y-6 rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur">
          <fieldset className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-white/80"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-white focus:outline-none"
              required
            />
          </fieldset>
          <fieldset className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-white/80"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-white focus:outline-none"
              required
            />
          </fieldset>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          <p className="text-xs text-white/50">
            Need access? Reach out to the core team for an invite code.
          </p>
        </form>
      </Container>
    </section>
  );
}
