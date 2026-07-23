/**
 * Agiliza Design System — Typography Tokens
 *
 * Fonte principal: Outfit (geometric, modern, human)
 * Fallback: Inter (system-like, legível)
 *
 * Escala tipográfica baseada em 1.250 (Major Third)
 */

import { Platform, TextStyle } from "react-native";

// ─── Font Family ─────────────────────────────────────────────────────────────

const outfitFamily = "Outfit";
const interFamily = "Inter";

export const fontFamily = {
  outfit: {
    thin: `${outfitFamily}-Thin` as const,
    extralight: `${outfitFamily}-ExtraLight` as const,
    light: `${outfitFamily}-Light` as const,
    regular: `${outfitFamily}-Regular` as const,
    medium: `${outfitFamily}-Medium` as const,
    semibold: `${outfitFamily}-SemiBold` as const,
    bold: `${outfitFamily}-Bold` as const,
    extrabold: `${outfitFamily}-ExtraBold` as const,
    black: `${outfitFamily}-Black` as const,
  },
  inter: {
    thin: `${interFamily}-Thin` as const,
    extralight: `${interFamily}-ExtraLight` as const,
    light: `${interFamily}-Light` as const,
    regular: `${interFamily}-Regular` as const,
    medium: `${interFamily}-Medium` as const,
    semibold: `${interFamily}-SemiBold` as const,
    bold: `${interFamily}-Bold` as const,
    extrabold: `${interFamily}-ExtraBold` as const,
    black: `${interFamily}-Black` as const,
  },
} as const;

// ─── Type Scale ──────────────────────────────────────────────────────────────

export type TypographyVariant =
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "caption"
  | "overline";

export interface TextStyleConfig {
  fontSize: number;
  fontWeight: TextStyle["fontWeight"];
  lineHeight: number;
  letterSpacing: number;
  fontFamily: string;
}

// ─── Light Mode Typography ───────────────────────────────────────────────────

export const typography: Record<TypographyVariant, TextStyleConfig> = {
  "display-xl": {
    fontSize: 48,
    fontWeight: "800",
    lineHeight: 56,
    letterSpacing: -1.5,
    fontFamily: Platform.OS === "ios" ? "Outfit-ExtraBold" : "Outfit-ExtraBold",
  },
  "display-lg": {
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 48,
    letterSpacing: -1,
    fontFamily: Platform.OS === "ios" ? "Outfit-Bold" : "Outfit-Bold",
  },
  "display-md": {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    letterSpacing: -0.75,
    fontFamily: Platform.OS === "ios" ? "Outfit-Bold" : "Outfit-Bold",
  },
  h1: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === "ios" ? "Outfit-Bold" : "Outfit-Bold",
  },
  h2: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
    letterSpacing: -0.25,
    fontFamily: Platform.OS === "ios" ? "Outfit-SemiBold" : "Outfit-SemiBold",
  },
  h3: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
    letterSpacing: 0,
    fontFamily: Platform.OS === "ios" ? "Outfit-SemiBold" : "Outfit-SemiBold",
  },
  h4: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 26,
    letterSpacing: 0,
    fontFamily: Platform.OS === "ios" ? "Outfit-SemiBold" : "Outfit-SemiBold",
  },
  "body-lg": {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 28,
    letterSpacing: 0,
    fontFamily: Platform.OS === "ios" ? "Inter-Regular" : "Inter-Regular",
  },
  "body-md": {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: Platform.OS === "ios" ? "Inter-Regular" : "Inter-Regular",
  },
  "body-sm": {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 0.1,
    fontFamily: Platform.OS === "ios" ? "Inter-Regular" : "Inter-Regular",
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.2,
    fontFamily: Platform.OS === "ios" ? "Inter-Regular" : "Inter-Regular",
  },
  overline: {
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 16,
    letterSpacing: 1.5,
    fontFamily: Platform.OS === "ios" ? "Inter-SemiBold" : "Inter-SemiBold",
  },
};

// ─── NativeWind Class Mapping ────────────────────────────────────────────────
// Estas classes podem ser usadas diretamente com className

export const typographyClasses = {
  "display-xl": "text-[48px] font-extrabold leading-[56px] tracking-[-1.5px]",
  "display-lg": "text-[40px] font-bold leading-[48px] tracking-[-1px]",
  "display-md": "text-[32px] font-bold leading-[40px] tracking-[-0.75px]",
  h1: "text-[28px] font-bold leading-[36px] tracking-[-0.5px]",
  h2: "text-[24px] font-semibold leading-[32px] tracking-[-0.25px]",
  h3: "text-[20px] font-semibold leading-[28px]",
  h4: "text-[18px] font-semibold leading-[26px]",
  "body-lg": "text-[18px] font-normal leading-[28px]",
  "body-md": "text-[16px] font-normal leading-[24px]",
  "body-sm": "text-[14px] font-normal leading-[20px] tracking-[0.1px]",
  caption: "text-[12px] font-normal leading-[16px] tracking-[0.2px]",
  overline:
    "text-[11px] font-semibold leading-[16px] tracking-[1.5px] uppercase",
} as const;

// ─── Font Weight Presets ─────────────────────────────────────────────────────

export const fontWeight = {
  thin: "100" as const,
  extralight: "200" as const,
  light: "300" as const,
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "800" as const,
  black: "900" as const,
} as const;
