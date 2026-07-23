/**
 * Agiliza Design System — Color Tokens
 *
 * Paleta inspirada em Linear, Stripe e Nubank.
 * tons warm-violet que transmitem confiança, humanização e modernidade.
 */

// ─── Brand Colors ────────────────────────────────────────────────────────────

export const primary = {
  50: "#f5f3ff",
  100: "#ede9fe",
  200: "#ddd6fe",
  300: "#c4b5fd",
  400: "#a78bfa",
  500: "#8b5cf6",
  600: "#7c3aed",
  700: "#6d28d9",
  800: "#5b21b6",
  900: "#4c1d95",
  950: "#2e1065",
} as const;

export const secondary = {
  50: "#fff7ed",
  100: "#ffedd5",
  200: "#fed7aa",
  300: "#fdba74",
  400: "#fb923c",
  500: "#f97316",
  600: "#ea580c",
  700: "#c2410c",
  800: "#9a3412",
  900: "#7c2d12",
  950: "#431407",
} as const;

export const accent = {
  50: "#ecfdf5",
  100: "#d1fae5",
  200: "#a7f3d0",
  300: "#6ee7b7",
  400: "#34d399",
  500: "#10b981",
  600: "#059669",
  700: "#047857",
  800: "#065f46",
  900: "#064e3b",
  950: "#022c22",
} as const;

// ─── Semantic Colors ─────────────────────────────────────────────────────────

export const success = {
  50: "#f0fdf4",
  100: "#dcfce7",
  200: "#bbf7d0",
  300: "#86efac",
  400: "#4ade80",
  500: "#22c55e",
  600: "#16a34a",
  700: "#15803d",
  800: "#166534",
  900: "#14532d",
  950: "#052e16",
} as const;

export const warning = {
  50: "#fffbeb",
  100: "#fef3c7",
  200: "#fde68a",
  300: "#fcd34d",
  400: "#fbbf24",
  500: "#f59e0b",
  600: "#d97706",
  700: "#b45309",
  800: "#92400e",
  900: "#78350f",
  950: "#451a03",
} as const;

export const error = {
  50: "#fef2f2",
  100: "#fee2e2",
  200: "#fecaca",
  300: "#fca5a5",
  400: "#f87171",
  500: "#ef4444",
  600: "#dc2626",
  700: "#b91c1c",
  800: "#991b1b",
  900: "#7f1d1d",
  950: "#450a0a",
} as const;

export const info = {
  50: "#eff6ff",
  100: "#dbeafe",
  200: "#bfdbfe",
  300: "#93c5fd",
  400: "#60a5fa",
  500: "#3b82f6",
  600: "#2563eb",
  700: "#1d4ed8",
  800: "#1e40af",
  900: "#1e3a8a",
  950: "#172554",
} as const;

// ─── Neutral Colors ──────────────────────────────────────────────────────────

export const neutral = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b",
  950: "#09090b",
} as const;

// ─── Surface & Background (Light Mode) ──────────────────────────────────────

export const surface = {
  primary: "#ffffff",
  secondary: "#f9fafb",
  tertiary: "#f3f4f6",
  elevated: "#ffffff",
  overlay: "rgba(0, 0, 0, 0.5)",
} as const;

export const background = {
  primary: "#ffffff",
  secondary: "#f9fafb",
  tertiary: "#f3f4f6",
} as const;

// ─── Text Colors ─────────────────────────────────────────────────────────────

export const text = {
  primary: "#18181b",
  secondary: "#52525b",
  tertiary: "#a1a1aa",
  inverse: "#ffffff",
  link: "#7c3aed",
  onPrimary: "#ffffff",
} as const;

// ─── Border Colors ───────────────────────────────────────────────────────────

export const border = {
  default: "#e4e4e7",
  strong: "#d4d4d8",
  focus: "#8b5cf6",
  error: "#ef4444",
  success: "#22c55e",
} as const;

// ─── Dark Mode Surface & Background ─────────────────────────────────────────

export const darkSurface = {
  primary: "#09090b",
  secondary: "#18181b",
  tertiary: "#27272a",
  elevated: "#1c1c1e",
  overlay: "rgba(0, 0, 0, 0.7)",
} as const;

export const darkBackground = {
  primary: "#09090b",
  secondary: "#18181b",
  tertiary: "#27272a",
} as const;

export const darkText = {
  primary: "#fafafa",
  secondary: "#a1a1aa",
  tertiary: "#71717a",
  inverse: "#18181b",
  link: "#a78bfa",
  onPrimary: "#ffffff",
} as const;

export const darkBorder = {
  default: "#27272a",
  strong: "#3f3f46",
  focus: "#8b5cf6",
  error: "#f87171",
  success: "#4ade80",
} as const;

// ─── Complete Color Export ───────────────────────────────────────────────────

export const colors = {
  primary,
  secondary,
  accent,
  success,
  warning,
  error,
  info,
  neutral,
  surface,
  background,
  text,
  border,
  darkSurface,
  darkBackground,
  darkText,
  darkBorder,
} as const;

export type Colors = typeof colors;
