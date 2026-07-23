import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BottomSheetProps {
  /** Controlar visibilidade */
  visible: boolean;
  /** Callback de fechar */
  onClose: () => void;
  /** Conteúdo */
  children: React.ReactNode;
  /** Título */
  title?: string;
  /** Altura máxima (padrão: 80% da tela) */
  maxHeight?: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function BottomSheet({
  visible,
  onClose,
  children,
  title,
  maxHeight = 0.8,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();

  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-50">
      {/* Overlay */}
      <Pressable
        className="absolute inset-0 bg-black/50"
        onPress={onClose}
      />

      {/* Sheet */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl"
        style={{
          maxHeight: `${maxHeight * 100}%`,
          paddingBottom: Math.max(insets.bottom, 16),
        }}
      >
        {/* Handle */}
        <View className="items-center pt-3 pb-2">
          <View className="w-10 h-1 bg-neutral-200 rounded-full" />
        </View>

        {/* Header */}
        {title && (
          <View className="px-6 pb-3 border-b border-neutral-100">
            <Text className="text-lg font-semibold text-neutral-900">
              {title}
            </Text>
          </View>
        )}

        {/* Content */}
        <View className="px-6 pt-4">{children}</View>
      </View>
    </View>
  );
}
