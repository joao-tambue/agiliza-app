/**
 * Agiliza Design System — Border Radius Tokens
 *
 * Inspirado em iOS, Airbnb e Linear.
 * Raios maiores = visual mais amigável e moderno.
 *
 * Guia de uso:
 *   xs   (2px)   — Badges pequenos, tags inline
 *   sm   (4px)   — Botões pequenos, inputs
 *   md   (8px)   — Cards, modais, componentes padrão
 *   lg   (12px)  — Cards grandes, bottom sheets
 *   xl   (16px)  — Feature cards, hero sections
 *   2xl  (20px)  — Full-width cards, large containers
 *   3xl  (24px)  — Avatar grande, circular badges
 *   full (9999px) — Botões pill, avatares circulares
 */

export const radius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 24,
  full: 9999,
} as const;

export type RadiusKey = keyof typeof radius;

// ─── Component Radius Presets ────────────────────────────────────────────────

export const componentRadius = {
  button: radius.md,
  buttonPill: radius.full,
  input: radius.md,
  card: radius.lg,
  cardFeature: radius.xl,
  avatar: radius.full,
  avatarSquare: radius.lg,
  badge: radius.full,
  chip: radius.full,
  chipSquare: radius.md,
  bottomSheet: radius["2xl"],
  modal: radius.xl,
  toast: radius.lg,
  skeleton: radius.md,
  image: radius.lg,
  thumbnail: radius.md,
} as const;

// ─── NativeWind Classes ──────────────────────────────────────────────────────

export const radiusClasses = {
  "rounded-xs": "rounded-xs",
  "rounded-sm": "rounded-sm",
  "rounded-md": "rounded-md",
  "rounded-lg": "rounded-lg",
  "rounded-xl": "rounded-xl",
  "rounded-2xl": "rounded-2xl",
  "rounded-3xl": "rounded-3xl",
  "rounded-full": "rounded-full",
} as const;
