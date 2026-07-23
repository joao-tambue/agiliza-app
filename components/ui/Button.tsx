import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  PressableProps,
  ViewStyle,
  TextStyle,
} from "react-native";
// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<PressableProps, "style"> {
  /** Texto do botão */
  title: string;
  /** Variante visual */
  variant?: ButtonVariant;
  /** Tamanho do botão */
  size?: ButtonSize;
  /** Mostrar loading spinner */
  loading?: boolean;
  /** Desabilitar botão */
  disabled?: boolean;
  /** Ícone à esquerda */
  leftIcon?: React.ReactNode;
  /** Ícone à direita */
  rightIcon?: React.ReactNode;
  /** Ocupar largura total */
  fullWidth?: boolean;
  /** Estilo customizado do container */
  style?: ViewStyle;
  /** Estilo customizado do texto */
  textStyle?: TextStyle;
}

// ─── Size Config ─────────────────────────────────────────────────────────────

const sizeConfig: Record<
  ButtonSize,
  { container: string; text: string; icon: number; padding: string; height: string }
> = {
  sm: {
    container: "rounded-md",
    text: "text-sm font-semibold",
    icon: 16,
    padding: "px-3 py-2",
    height: "h-9",
  },
  md: {
    container: "rounded-lg",
    text: "text-base font-semibold",
    icon: 18,
    padding: "px-5 py-3",
    height: "h-12",
  },
  lg: {
    container: "rounded-lg",
    text: "text-lg font-semibold",
    icon: 20,
    padding: "px-6 py-3.5",
    height: "h-14",
  },
};

// ─── Variant Styles ──────────────────────────────────────────────────────────

const variantStyles: Record<
  ButtonVariant,
  { container: string; text: string; loadingColor: string }
> = {
  primary: {
    container: "bg-primary-600 active:bg-primary-700",
    text: "text-white",
    loadingColor: "#ffffff",
  },
  secondary: {
    container: "bg-primary-100 active:bg-primary-200",
    text: "text-primary-700",
    loadingColor: "#6d28d9",
  },
  outline: {
    container: "border-2 border-primary-600 active:bg-primary-50",
    text: "text-primary-600",
    loadingColor: "#7c3aed",
  },
  ghost: {
    container: "active:bg-neutral-100",
    text: "text-primary-600",
    loadingColor: "#7c3aed",
  },
  danger: {
    container: "bg-danger-600 active:bg-danger-700",
    text: "text-white",
    loadingColor: "#ffffff",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Button({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const sizeCfg = sizeConfig[size];
  const variantCfg = variantStyles[variant];

  const isDisabled = disabled || loading;

  return (
    <Pressable
      className={`
        flex-row items-center justify-center
        ${sizeCfg.container}
        ${sizeCfg.padding}
        ${sizeCfg.height}
        ${variantCfg.container}
        ${fullWidth ? "w-full" : "self-start"}
        ${isDisabled ? "opacity-50" : "opacity-100"}
      `}
      disabled={isDisabled}
      style={({ pressed }) => [
        pressed && { transform: [{ scale: 0.98 }] },
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantCfg.loadingColor}
          style={{ marginRight: leftIcon ? 8 : 0 }}
        />
      ) : leftIcon ? (
        <React.Fragment>
          {leftIcon}
          <Text
            className={`${sizeCfg.text} ${variantCfg.text} ml-2`}
            style={textStyle}
          >
            {title}
          </Text>
        </React.Fragment>
      ) : (
        <Text
          className={`${sizeCfg.text} ${variantCfg.text}`}
          style={textStyle}
        >
          {title}
        </Text>
      )}

      {!loading && rightIcon && (
        <React.Fragment>
          <Text
            className={`${sizeCfg.text} ${variantCfg.text} mr-2`}
            style={textStyle}
          >
            {title}
          </Text>
          {rightIcon}
        </React.Fragment>
      )}
    </Pressable>
  );
}
