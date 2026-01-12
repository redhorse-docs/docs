"use client";

import { navLinks, primaryCtas } from "@/lib/constants/nav";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Container } from "./container";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [primaryAction, secondaryAction] = primaryCtas;

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.3em] text-white"
        >
          <Image src='/redhorse-logo.png' alt='RedHorse' width={200} height={200} />
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
          {secondaryAction && (
            <Button variant="ghost" href={secondaryAction.href}>
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button href={primaryAction.href}>{primaryAction.label}</Button>
          )}
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
              {primaryAction && (
                <Button href={primaryAction.href}>{primaryAction.label}</Button>
              )}
              {secondaryAction && (
                <Button variant="ghost" href={secondaryAction.href}>
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
