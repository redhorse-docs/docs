export const palette = {
  background: "#040506",
  surface: "#0A0C10",
  surfaceMuted: "#11131A",
  stroke: "rgba(255,255,255,0.06)",
  primary: "#E0323A",
  primaryStrong: "#B9242B",
  primaryMuted: "rgba(224,50,58,0.16)",
  text: "#F4F4F5",
  textMuted: "#A1A1AA",
};

export const fonts = {
  sans: "var(--rh-font-sans)",
  mono: "var(--rh-font-mono)",
};

export const buttonStyles = {
  primary:
    "bg-gradient-to-r from-[--rh-primary] via-[#ff5464] to-[--rh-secondary] text-white shadow-[0_18px_45px_rgba(224,50,58,0.35)] hover:opacity-95 focus-visible:outline-[--rh-primary] active:opacity-90",
  secondary:
    "bg-[--rh-surface-muted] text-white border border-white/10 hover:border-white/30 hover:bg-[--rh-surface] focus-visible:outline-[--rh-secondary] shadow-[0_12px_35px_rgba(12,11,26,0.6)]",
  ghost:
    "border border-white/15 text-white/90 hover:border-white/40 hover:bg-white/5 active:bg-white/10",
  subtle:
    "bg-white/5 text-white hover:bg-white/10 active:bg-white/15 border border-transparent",
};

export const layoutTokens = {
  sectionGap: {
    base: "py-16",
    md: "md:py-24",
  },
  container: "mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-12",
};
