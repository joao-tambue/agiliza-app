import React from "react";
import {
  View,
  Text,
  Pressable,
  Modal as RNModal,
  ViewStyle,
} from "react-native";
import { X } from "lucide-react-native";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ModalVariant = "center" | "bottom" | "fullscreen";

export interface ModalProps {
  /** Controlar visibilidade */
  visible: boolean;
  /** Callback de fechar */
  onClose: () => void;
  /** Conteúdo do modal */
  children: React.ReactNode;
  /** Variante */
  variant?: ModalVariant;
  /** Título (apenas para center/bottom) */
  title?: string;
  /** Mostrar botão de fechar */
  showCloseButton?: boolean;
  /** Estilo customizado */
  style?: ViewStyle;
  /** Transparência do overlay */
  overlayOpacity?: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Modal({
  visible,
  onClose,
  children,
  variant = "center",
  title,
  showCloseButton = true,
  style,
  overlayOpacity = 0.5,
}: ModalProps) {
  if (variant === "fullscreen") {
    return (
      <RNModal
        visible={visible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={onClose}
      >
        <View className="flex-1 bg-white">
          <View className="flex-row items-center justify-between px-4 py-3 border-b border-neutral-100">
            {showCloseButton && (
              <Pressable
                onPress={onClose}
                className="w-10 h-10 items-center justify-center rounded-full bg-neutral-100"
                accessibilityRole="button"
                accessibilityLabel="Fechar"
              >
                <X size={20} color="#52525b" />
              </Pressable>
            )}
            {title && (
              <Text className="text-lg font-semibold text-neutral-900">
                {title}
              </Text>
            )}
            <View className="w-10" />
          </View>
          <View className="flex-1">{children}</View>
        </View>
      </RNModal>
    );
  }

  return (
    <RNModal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
        onPress={onClose}
      >
        {variant === "center" && (
          <Pressable
            className="bg-white rounded-2xl p-6 mx-6 max-w-sm w-full shadow-xl"
            onPress={(e) => e.stopPropagation()}
            style={style}
          >
            <View className="flex-row items-center justify-between mb-4">
              {title && (
                <Text className="text-lg font-semibold text-neutral-900 flex-1">
                  {title}
                </Text>
              )}
              {showCloseButton && (
                <Pressable
                  onPress={onClose}
                  className="w-8 h-8 items-center justify-center rounded-full bg-neutral-100"
                  accessibilityRole="button"
                  accessibilityLabel="Fechar"
                >
                  <X size={16} color="#52525b" />
                </Pressable>
              )}
            </View>
            {children}
          </Pressable>
        )}

        {variant === "bottom" && (
          <Pressable
            className="bg-white rounded-t-3xl pt-4 pb-8 px-6 w-full max-w-lg"
            onPress={(e) => e.stopPropagation()}
            style={style}
          >
            <View className="w-10 h-1 bg-neutral-200 rounded-full self-center mb-4" />

            <View className="flex-row items-center justify-between mb-4">
              {title && (
                <Text className="text-lg font-semibold text-neutral-900 flex-1">
                  {title}
                </Text>
              )}
              {showCloseButton && (
                <Pressable
                  onPress={onClose}
                  className="w-8 h-8 items-center justify-center rounded-full bg-neutral-100"
                  accessibilityRole="button"
                  accessibilityLabel="Fechar"
                >
                  <X size={16} color="#52525b" />
                </Pressable>
              )}
            </View>
            {children}
          </Pressable>
        )}
      </Pressable>
    </RNModal>
  );
}
