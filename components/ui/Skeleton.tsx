import React, { useEffect, useRef } from "react";
import { View, Animated, ViewStyle } from "react-native";

// ─── Types ───────────────────────────────────────────────────────────────────

export type SkeletonVariant = "text" | "title" | "avatar" | "card" | "image" | "custom";

export interface SkeletonProps {
  /** Variante do skeleton */
  variant?: SkeletonVariant;
  /** Largura */
  width?: number | string;
  /** Altura */
  height?: number;
  /** Formato arredondado */
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  /** Estilo customizado */
  style?: ViewStyle;
  /** Espaçamento entre skeletons */
  gap?: number;
}

// ─── Pulse Animation ─────────────────────────────────────────────────────────

function SkeletonPulse({
  width,
  height,
  style,
}: {
  width?: number | string;
  height?: number;
  style?: ViewStyle;
}) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      className="bg-neutral-200"
      style={[
        {
          width: width as any,
          height,
          opacity,
        },
        style,
      ]}
    />
  );
}

// ─── Rounded Config ──────────────────────────────────────────────────────────

const roundedConfig = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Skeleton({
  variant = "text",
  width,
  height,
  rounded = "md",
  style,
}: SkeletonProps) {
  const configs: Record<SkeletonVariant, { width: number | string; height: number; rounded: typeof rounded }> = {
    text: { width: "100%", height: 16, rounded: "sm" },
    title: { width: "70%", height: 24, rounded: "sm" },
    avatar: { width: 48, height: 48, rounded: "full" },
    card: { width: "100%", height: 120, rounded: "lg" },
    image: { width: "100%", height: 200, rounded: "lg" },
    custom: { width: width || "100%", height: height || 16, rounded },
  };

  const cfg = configs[variant];

  return (
    <SkeletonPulse
      width={width || cfg.width}
      height={height || cfg.height}
      style={{
        borderRadius: roundedConfig[cfg.rounded] === "rounded-full" ? 9999 : undefined,
        ...style,
      }}
    />
  );
}

// ─── Skeleton Presets ────────────────────────────────────────────────────────

export function SkeletonCard() {
  return (
    <View className="bg-white rounded-xl p-4 border border-neutral-100">
      <View className="flex-row items-center mb-3">
        <Skeleton variant="avatar" width={48} height={48} />
        <View className="ml-3 flex-1">
          <Skeleton variant="title" width="60%" height={18} />
          <Skeleton variant="text" width="40%" height={14} />
        </View>
      </View>
      <Skeleton variant="image" height={160} />
      <View className="mt-3">
        <Skeleton variant="text" width="100%" height={14} />
        <Skeleton variant="text" width="80%" height={14} />
      </View>
    </View>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <View className="gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}
