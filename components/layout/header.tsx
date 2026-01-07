"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks, primaryCtas } from "@/lib/constants/nav";
import { cn } from "@/lib/utils/cn";
import { Container } from "./container";
import { Button } from "../ui/button";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-white"
        >
          LOGO | RedHorse
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/70 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "transition-colors hover:text-white",
                link.href.startsWith("#") &&
                  "scroll-smooth focus-visible:outline-none",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" href={primaryCtas[1].href}>
            {primaryCtas[1].label}
          </Button>
          <Button href={primaryCtas[0].href}>{primaryCtas[0].label}</Button>
        </div>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            {[0, 1, 2].map((line) => (
              <span
                key={line}
                className="block h-0.5 w-6 bg-white transition-transform"
              />
            ))}
          </div>
        </button>
      </Container>
      {menuOpen && (
        <div className="border-t border-white/10 bg-[var(--rh-surface)] lg:hidden">
          <Container className="flex flex-col gap-6 py-6">
            <nav className="flex flex-col gap-4 text-base text-white/80">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-md px-1 py-1 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <Button href={primaryCtas[0].href}>{primaryCtas[0].label}</Button>
              <Button variant="ghost" href={primaryCtas[1].href}>
                {primaryCtas[1].label}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
