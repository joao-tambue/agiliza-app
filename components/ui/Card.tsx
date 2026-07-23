import React from "react";
import { View, Text, Pressable, PressableProps, ViewStyle } from "react-native";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CardProps extends Omit<PressableProps, "style"> {
  children: React.ReactNode;
  /** Variante visual */
  variant?: "default" | "elevated" | "outlined";
  /** Padding do card */
  padding?: "none" | "sm" | "md" | "lg";
  /** Estilo customizado */
  style?: ViewStyle;
  /** Será pressionável */
  pressable?: boolean;
}

// ─── Padding Config ──────────────────────────────────────────────────────────

const paddingConfig = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

// ─── Variant Config ──────────────────────────────────────────────────────────

const variantConfig = {
  default: "bg-white border border-neutral-100",
  elevated: "bg-white",
  outlined: "bg-transparent border border-neutral-200",
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Card({
  children,
  variant = "default",
  padding = "md",
  style,
  pressable = false,
  ...props
}: CardProps) {
  const Container = pressable ? Pressable : View;
  const containerProps = pressable ? props : {};

  return (
    <Container
      className={`
        rounded-xl
        ${variantConfig[variant]}
        ${paddingConfig[padding]}
        ${variant === "elevated" ? "shadow-md" : ""}
      `}
      style={({ pressed }) => [
        pressed && pressable ? { transform: [{ scale: 0.98 }] } : undefined,
        style,
      ]}
      {...containerProps}
    >
      {children}
    </Container>
  );
}

// ─── Card Sub-Components ─────────────────────────────────────────────────────

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <View className="flex-row items-center justify-between mb-3">
      <View className="flex-1">
        <Text className="text-lg font-semibold text-neutral-900">{title}</Text>
        {subtitle && (
          <Text className="text-sm text-neutral-500 mt-0.5">{subtitle}</Text>
        )}
      </View>
      {action}
    </View>
  );
}

export interface CardContentProps {
  children: React.ReactNode;
}

export function CardContent({ children }: CardContentProps) {
  return <View>{children}</View>;
}

export interface CardFooterProps {
  children: React.ReactNode;
}

export function CardFooter({ children }: CardFooterProps) {
  return (
    <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-neutral-100">
      {children}
    </View>
  );
}
