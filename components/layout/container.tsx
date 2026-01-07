import type { ReactNode } from "react";
import { layoutTokens } from "@/lib/constants/theme";
import { cn } from "@/lib/utils/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn(layoutTokens.container, "w-full", className)}>
      {children}
    </div>
  );
}
