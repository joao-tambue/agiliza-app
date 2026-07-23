import React from "react";
import { Pressable, Text, PressableProps, ViewStyle } from "react-native";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ChipVariant = "filter" | "category" | "selectable";
export type ChipSize = "sm" | "md" | "lg";

export interface ChipProps extends Omit<PressableProps, "style"> {
  /** Texto do chip */
  label: string;
  /** Variante visual */
  variant?: ChipVariant;
  /** Tamanho */
  size?: ChipSize;
  /** Estado selecionado */
  selected?: boolean;
  /** Ícone à esquerda */
  leftIcon?: React.ReactNode;
  /** Ícone à direita */
  rightIcon?: React.ReactNode;
  /** Estilo customizado */
  style?: ViewStyle;
}

// ─── Size Config ─────────────────────────────────────────────────────────────

const sizeConfig: Record<ChipSize, { container: string; text: string; height: string }> = {
  sm: {
    container: "px-2.5 py-1 rounded-full",
    text: "text-xs font-medium",
    height: "h-7",
  },
  md: {
    container: "px-3 py-1.5 rounded-full",
    text: "text-sm font-medium",
    height: "h-8",
  },
  lg: {
    container: "px-4 py-2 rounded-full",
    text: "text-base font-medium",
    height: "h-10",
  },
};

// ─── Variant Config ──────────────────────────────────────────────────────────

const variantConfig: Record<
  ChipVariant,
  { selected: { bg: string; text: string; border: string }; unselected: { bg: string; text: string; border: string } }
> = {
  filter: {
    selected: {
      bg: "bg-primary-100",
      text: "text-primary-700",
      border: "border-primary-300",
    },
    unselected: {
      bg: "bg-neutral-100",
      text: "text-neutral-600",
      border: "border-neutral-200",
    },
  },
  category: {
    selected: {
      bg: "bg-primary-600",
      text: "text-white",
      border: "border-primary-600",
    },
    unselected: {
      bg: "bg-white",
      text: "text-neutral-600",
      border: "border-neutral-200",
    },
  },
  selectable: {
    selected: {
      bg: "bg-primary-50",
      text: "text-primary-700",
      border: "border-primary-400",
    },
    unselected: {
      bg: "bg-white",
      text: "text-neutral-500",
      border: "border-neutral-200",
    },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Chip({
  label,
  variant = "filter",
  size = "md",
  selected = false,
  leftIcon,
  rightIcon,
  style,
  ...props
}: ChipProps) {
  const sizeCfg = sizeConfig[size];
  const variantCfg = selected
    ? variantConfig[variant].selected
    : variantConfig[variant].unselected;

  return (
    <Pressable
      className={`
        flex-row items-center justify-center
        ${sizeCfg.container}
        ${sizeCfg.height}
        ${variantCfg.bg}
        border
        ${variantCfg.border}
        ${props.disabled ? "opacity-50" : "active:opacity-80"}
      `}
      style={({ pressed }) => [
        pressed ? { transform: [{ scale: 0.95 }] } : undefined,
        style,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      {...props}
    >
      {leftIcon && <React.Fragment>{leftIcon}</React.Fragment>}

      <Text className={`${sizeCfg.text} ${variantCfg.text}`}>{label}</Text>

      {rightIcon && <React.Fragment>{rightIcon}</React.Fragment>}
    </Pressable>
  );
}
