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
  primary: [
    "bg-[--rh-primary] text-white font-semibold",
    "shadow-[0_4px_20px_rgba(224,50,58,0.5)]",
    "hover:bg-[#c42a31] hover:shadow-[0_6px_28px_rgba(224,50,58,0.6)]",
    "active:scale-95",
  ].join(" "),

  secondary: [
    "bg-white/10 text-white font-semibold",
    "border border-white/20 backdrop-blur-sm",
    "hover:bg-white/15 hover:border-white/40",
    "shadow-[0_4px_20px_rgba(0,0,0,0.25)]",
  ].join(" "),

  ghost: [
    "border border-white/20 text-white font-medium",
    "hover:border-white/40 hover:bg-white/10",
    "active:bg-white/15",
  ].join(" "),

  subtle: [
    "bg-white/5 text-white/90",
    "hover:bg-white/10 hover:text-white",
    "active:bg-white/15",
  ].join(" "),
};

export const layoutTokens = {
  sectionGap: {
    base: "py-20",
    md: "md:py-32",
    lg: "lg:py-40",
  },
  container: "mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16",
};

export const typography = {
  // Hero headlines
  heroTitle: "text-5xl md:text-6xl lg:text-7xl",
  // Section titles
  sectionTitle: "text-4xl md:text-5xl lg:text-6xl",
  // Card titles
  cardTitle: "text-xl md:text-2xl",
  // Body text
  body: "text-base md:text-lg lg:text-xl",
  // Small text
  small: "text-sm md:text-base",
};
