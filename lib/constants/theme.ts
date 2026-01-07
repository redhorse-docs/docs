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
  sans: "var(--font-geist-sans)",
  mono: "var(--font-geist-mono)",
};

export const buttonStyles = {
  primary:
    "bg-[--rh-primary] text-white hover:bg-[--rh-primary-strong] focus-visible:outline-[--rh-primary] active:bg-[--rh-primary-strong]",
  ghost:
    "border border-white/15 text-white hover:border-white/40 hover:bg-white/5 active:bg-white/10",
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
