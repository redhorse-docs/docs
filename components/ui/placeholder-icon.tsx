import type { IconName } from "@/lib/types/landing";
import { cn } from "@/lib/utils/cn";

const iconPaths: Record<IconName, JSX.Element> = {
  spark: (
    <>
      <path
        d="M12 3v6M12 15v6M4.5 6l4.2 4.2M15.3 13.5l4.2 4.2M3 12h6M15 12h6M6 19.5l4.2-4.2M13.5 8.7l4.2-4.2"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </>
  ),
  orbit: (
    <>
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth={1.5} />
      <path
        d="M6 6c3.5-3.5 8.5-3.5 12 0s3.5 8.5 0 12-8.5 3.5-12 0-3.5-8.5 0-12Z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </>
  ),
  stack: (
    <>
      <path
        d="M5 9.5 12 6l7 3.5-7 3.5-7-3.5Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M5 14.5 12 18l7-3.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  shield: (
    <>
      <path
        d="M12 4 6 6v6c0 4 2.5 6.5 6 8 3.5-1.5 6-4 6-8V6l-6-2Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </>
  ),
  wave: (
    <>
      <path
        d="M4 14s1.5 2 4 2 4-2 6-2 4 2 6 2"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M4 10s1.5-2 4-2 4 2 6 2 4-2 6-2"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </>
  ),
  bolt: (
    <>
      <path
        d="M11 2 6 12h5l-1 8 5-10h-5l1-8Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </>
  ),
};

type PlaceholderIconProps = {
  name?: IconName;
  className?: string;
};

export function PlaceholderIcon({
  name = "spark",
  className,
}: PlaceholderIconProps) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="h-6 w-6"
      >
        {iconPaths[name]}
      </svg>
    </span>
  );
}
