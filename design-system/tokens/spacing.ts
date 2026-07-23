/**
 * Agiliza Design System — Spacing Tokens
 *
 * Sistema baseado em 4pt grid.
 * Cada valor é múltiplo de 4 para manter consistência visual.
 *
 * Guia de uso:
 *   0.5  (2px)  — Micro gaps, ícones inline
 *   1    (4px)  — gaps entre elementos pequenos, padding de badges
 *   1.5  (6px)  — Spacing extra para badges com texto
 *   2    (8px)  — Padding mínimo de toque (não usar em áreas clicáveis)
 *   2.5  (10px) — Spacing entre ícone e texto
 *   3    (12px) — Padding interno de inputs pequenos, gaps entre cards
 *   4    (16px) — Padding padrão de tela, gaps entre seções
 *   5    (20px) — Padding de cards grandes, spacing entre seções
 *   6    (24px) — Section spacing, padding de modais
 *   7    (28px) — Large section spacing
 *   8    (32px) — Page margins, large gaps
 *   9    (36px) — Extra large spacing
 *   10   (40px) — Hero section spacing
 *   11   (44px) — Touch target minimum (iOS)
 *   12   (48px) — Touch target minimum (Android)
 *   14   (56px) — Large component spacing
 *   16   (64px) — Extra large spacing
 *   20   (80px) — Screen-level spacing
 *   24   (96px) — Maximum spacing
 */

export const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
} as const;

export type SpacingKey = keyof typeof spacing;

// ─── Layout Constants ────────────────────────────────────────────────────────

export const layout = {
  /** Margem horizontal padrão das telas */
  screenMarginHorizontal: spacing[4], // 16px
  /** Margem superior das telas (safe area) */
  screenMarginTop: spacing[2], // 8px
  /** Padding interno de cards */
  cardPadding: spacing[4], // 16px
  /** Gap entre cards em listas */
  cardGap: spacing[3], // 12px
  /** Padding de seções */
  sectionPadding: spacing[6], // 24px
  /** Gap entre seções */
  sectionGap: spacing[6], // 24px
  /** Altura mínima de touch target (iOS) */
  touchTargetMin: spacing[11], // 44px
  /** Altura mínima de touch target (Android) */
  touchTargetMinAndroid: spacing[12], // 48px
  /** Largura máxima de conteúdo (tablet/desktop) */
  contentMaxWidth: 560,
  /** Largura de sidebar (tablet) */
  sidebarWidth: 320,
} as const;

// ─── NativeWind Classes ──────────────────────────────────────────────────────

export const spacingClasses = {
  "space-0.5": "gap-0.5",
  "space-1": "gap-1",
  "space-1.5": "gap-1.5",
  "space-2": "gap-2",
  "space-2.5": "gap-2.5",
  "space-3": "gap-3",
  "space-4": "gap-4",
  "space-5": "gap-5",
  "space-6": "gap-6",
  "space-8": "gap-8",
  "space-10": "gap-10",
  "space-12": "gap-12",
  "space-16": "gap-16",
  "space-20": "gap-20",
  "space-24": "gap-24",
} as const;
