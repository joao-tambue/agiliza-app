import React from "react";
import { View, Text, ViewStyle } from "react-native";

// ─── Types ───────────────────────────────────────────────────────────────────

export type BadgeVariant =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral"
  | "premium";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  /** Texto do badge */
  children: string;
  /** Variante visual */
  variant?: BadgeVariant;
  /** Tamanho */
  size?: BadgeSize;
  /** Mostrar dot indicador */
  dot?: boolean;
  /** Estilo customizado */
  style?: ViewStyle;
}

// ─── Variant Config ──────────────────────────────────────────────────────────

const variantConfig: Record<
  BadgeVariant,
  { bg: string; text: string; dot: string }
> = {
  success: {
    bg: "bg-success-100",
    text: "text-success-700",
    dot: "bg-success-500",
  },
  warning: {
    bg: "bg-warning-100",
    text: "text-warning-700",
    dot: "bg-warning-500",
  },
  error: {
    bg: "bg-danger-100",
    text: "text-danger-700",
    dot: "bg-danger-500",
  },
  info: {
    bg: "bg-info-100",
    text: "text-info-700",
    dot: "bg-info-500",
  },
  neutral: {
    bg: "bg-neutral-100",
    text: "text-neutral-600",
    dot: "bg-neutral-400",
  },
  premium: {
    bg: "bg-primary-100",
    text: "text-primary-700",
    dot: "bg-primary-500",
  },
};

// ─── Size Config ─────────────────────────────────────────────────────────────

const sizeConfig: Record<BadgeSize, { container: string; text: string; dot: number }> = {
  sm: {
    container: "px-2 py-0.5 rounded-full",
    text: "text-xs font-medium",
    dot: 6,
  },
  md: {
    container: "px-2.5 py-1 rounded-full",
    text: "text-xs font-semibold",
    dot: 6,
  },
  lg: {
    container: "px-3 py-1 rounded-full",
    text: "text-sm font-semibold",
    dot: 8,
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  dot = false,
  style,
}: BadgeProps) {
  const variantCfg = variantConfig[variant];
  const sizeCfg = sizeConfig[size];

  return (
    <View
      className={`flex-row items-center ${variantCfg.bg} ${sizeCfg.container}`}
      style={style}
    >
      {dot && (
        <View
          className={`rounded-full ${variantCfg.dot} mr-1.5`}
          style={{ width: sizeCfg.dot, height: sizeCfg.dot }}
        />
      )}

      <Text className={`${variantCfg.text} ${sizeCfg.text}`}>{children}</Text>
    </View>
  );
}
