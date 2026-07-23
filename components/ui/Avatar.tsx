import React from "react";
import { View, Text, Image, ViewStyle } from "react-native";

// ─── Types ───────────────────────────────────────────────────────────────────

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface AvatarProps {
  /** URL da imagem */
  source?: { uri: string } | number;
  /** Iniciais (fallback quando não há imagem) */
  initials?: string;
  /** Tamanho */
  size?: AvatarSize;
  /** Cor de fundo das iniciais */
  backgroundColor?: string;
  /** Cor do texto das iniciais */
  textColor?: string;
  /** Estilo customizado */
  style?: ViewStyle;
  /** Badge de status */
  status?: "online" | "away" | "busy" | "offline";
}

// ─── Size Config ─────────────────────────────────────────────────────────────

const sizeConfig: Record<
  AvatarSize,
  { container: string; text: string; image: number; status: number; statusBorder: number }
> = {
  xs: {
    container: "w-8 h-8 rounded-full",
    text: "text-xs font-semibold",
    image: 32,
    status: 8,
    statusBorder: 2,
  },
  sm: {
    container: "w-10 h-10 rounded-full",
    text: "text-sm font-semibold",
    image: 40,
    status: 10,
    statusBorder: 2,
  },
  md: {
    container: "w-12 h-12 rounded-full",
    text: "text-base font-semibold",
    image: 48,
    status: 12,
    statusBorder: 2,
  },
  lg: {
    container: "w-16 h-16 rounded-full",
    text: "text-lg font-semibold",
    image: 64,
    status: 14,
    statusBorder: 2,
  },
  xl: {
    container: "w-20 h-20 rounded-full",
    text: "text-xl font-semibold",
    image: 80,
    status: 16,
    statusBorder: 3,
  },
  "2xl": {
    container: "w-24 h-24 rounded-full",
    text: "text-2xl font-semibold",
    image: 96,
    status: 18,
    statusBorder: 3,
  },
};

// ─── Status Colors ───────────────────────────────────────────────────────────

const statusColors = {
  online: "#22c55e",
  away: "#f59e0b",
  busy: "#ef4444",
  offline: "#a1a1aa",
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Avatar({
  source,
  initials,
  size = "md",
  backgroundColor = "#ede9fe",
  textColor = "#6d28d9",
  style,
  status,
}: AvatarProps) {
  const cfg = sizeConfig[size];
  const displayName = initials || "?";

  return (
    <View style={style}>
      <View
        className={`${cfg.container} items-center justify-center overflow-hidden`}
        style={{ backgroundColor }}
      >
        {source ? (
          <Image
            source={source}
            className={`${cfg.container}`}
            resizeMode="cover"
          />
        ) : (
          <Text className={`${cfg.text}`} style={{ color: textColor }}>
            {displayName}
          </Text>
        )}
      </View>

      {status && (
        <View
          className="absolute rounded-full border-2 border-white"
          style={{
            width: cfg.status,
            height: cfg.status,
            backgroundColor: statusColors[status],
            bottom: 0,
            right: 0,
            borderWidth: cfg.statusBorder,
          }}
        />
      )}
    </View>
  );
}

// ─── Avatar Group ────────────────────────────────────────────────────────────

export interface AvatarGroupProps {
  avatars: Array<{ source?: { uri: string } | number; initials?: string }>;
  size?: AvatarSize;
  max?: number;
}

export function AvatarGroup({
  avatars,
  size = "sm",
  max = 3,
}: AvatarGroupProps) {
  const cfg = sizeConfig[size];
  const visibleAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <View className="flex-row items-center">
      {visibleAvatars.map((avatar, index) => (
        <View
          key={index}
          style={{
            marginLeft: index > 0 ? -8 : 0,
            zIndex: max - index,
          }}
        >
          <Avatar
            source={avatar.source}
            initials={avatar.initials}
            size={size}
          />
        </View>
      ))}

      {remaining > 0 && (
        <View
          className={`${cfg.container} items-center justify-center bg-neutral-200`}
          style={{ marginLeft: -8, zIndex: 0 }}
        >
          <Text className={`${cfg.text} text-neutral-600`}>
            +{remaining}
          </Text>
        </View>
      )}
    </View>
  );
}
