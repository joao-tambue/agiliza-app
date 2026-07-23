/**
 * Agiliza Design System — Shadow Tokens
 *
 * Sombras modernas e sutis.
 * iOS usa elevation + shadowColor/Offset/Opacity/Radius.
 * Android usa elevation (nível numérico).
 *
 * Guia de uso:
 *   shadow-xs    — Micro elevation, badges flutuantes
 *   shadow-sm    — Sutil elevation, cards em repouso
 *   shadow-md    — Cards com interação, dropdowns
 *   shadow-lg    — Bottom sheets, modais pequenos
 *   shadow-xl    — Modais中心, overlays
 *   shadow-floating — Elementos que "flutuam" (FABs, tooltips)
 */

import { Platform, ViewStyle } from "react-native";

// ─── Shadow Definitions ──────────────────────────────────────────────────────

interface ShadowStyle {
  ios: ViewStyle;
  android: ViewStyle;
  web: ViewStyle;
}

export const shadows: Record<string, ShadowStyle> = {
  "shadow-xs": {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 1,
    },
    web: {
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    },
  },
  "shadow-sm": {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    },
  },
  "shadow-md": {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    android: {
      elevation: 4,
    },
    web: {
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    },
  },
  "shadow-lg": {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
    },
    android: {
      elevation: 8,
    },
    web: {
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    },
  },
  "shadow-xl": {
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.15,
      shadowRadius: 25,
    },
    android: {
      elevation: 12,
    },
    web: {
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    },
  },
  "shadow-floating": {
    ios: {
      shadowColor: "#8b5cf6",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
    },
    android: {
      elevation: 16,
    },
    web: {
      boxShadow: "0 8px 24px -4px rgba(139, 92, 246, 0.25)",
    },
  },
};

// ─── Helper Function ─────────────────────────────────────────────────────────

/**
 * Retorna o estilo de sombra correto para a plataforma atual.
 */
export function getShadow(name: keyof typeof shadows): ViewStyle {
  const shadow = shadows[name];
  if (!shadow) return {};

  if (Platform.OS === "ios") return shadow.ios;
  if (Platform.OS === "android") return shadow.android;
  return shadow.web;
}

// ─── NativeWind Classes ──────────────────────────────────────────────────────
// Nota: NativeWind suporta shadow-sm, shadow-md, shadow-lg, shadow-xl nativamente.
// shadow-xs e shadow-floating precisam de customização via style.

export const shadowClasses = {
  "shadow-xs": "shadow-xs",
  "shadow-sm": "shadow-sm",
  "shadow-md": "shadow-md",
  "shadow-lg": "shadow-lg",
  "shadow-xl": "shadow-xl",
} as const;
