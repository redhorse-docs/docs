"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttonStyles } from "@/lib/constants/theme";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = keyof typeof buttonStyles;

type ButtonProps = {
  href?: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseClasses =
  "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:scale-[1.02] active:scale-[0.98]";

export function Button({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseClasses, buttonStyles[variant], className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseClasses, buttonStyles[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
