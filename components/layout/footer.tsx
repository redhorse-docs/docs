import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 py-12 text-sm text-white/60">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/50">
          <p>RedHorse</p>
          <p>Experimental membership rail</p>
        </div>
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} RedHorse Protocol. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
