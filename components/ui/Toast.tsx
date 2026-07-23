import React, { useEffect, useRef } from "react";
import { View, Text, Animated, useWindowDimensions } from "react-native";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
  /** Variante visual */
  variant: ToastVariant;
  /** Mensagem */
  message: string;
  /** Duração em ms (padrão: 3000) */
  duration?: number;
  /** Callback quando toast é fechado */
  onClose?: () => void;
  /** Ação adicional */
  action?: {
    label: string;
    onPress: () => void;
  };
}

// ─── Variant Config ──────────────────────────────────────────────────────────

const variantConfig: Record<
  ToastVariant,
  {
    bg: string;
    border: string;
    icon: typeof CheckCircle;
    iconColor: string;
  }
> = {
  success: {
    bg: "bg-success-50",
    border: "border-success-200",
    icon: CheckCircle,
    iconColor: "#22c55e",
  },
  error: {
    bg: "bg-danger-50",
    border: "border-danger-200",
    icon: XCircle,
    iconColor: "#ef4444",
  },
  warning: {
    bg: "bg-warning-50",
    border: "border-warning-200",
    icon: AlertTriangle,
    iconColor: "#f59e0b",
  },
  info: {
    bg: "bg-info-50",
    border: "border-info-200",
    icon: Info,
    iconColor: "#3b82f6",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Toast({
  variant,
  message,
  duration = 3000,
  onClose,
  action,
}: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;
  const insets = useSafeAreaInsets();

  const cfg = variantConfig[variant];
  const IconComponent = cfg.icon;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => onClose?.());
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      className={`
        absolute left-4 right-4 z-50
        flex-row items-center
        ${cfg.bg} border ${cfg.border}
        rounded-xl px-4 py-3
        shadow-lg
      `}
      style={{
        opacity,
        transform: [{ translateY }],
        top: insets.top + 8,
      }}
    >
      <IconComponent size={20} color={cfg.iconColor} />

      <Text className="flex-1 text-sm font-medium text-neutral-900 ml-3">
        {message}
      </Text>

      {action && (
        <Text
          className="text-sm font-semibold text-primary-600 ml-2"
          onPress={action.onPress}
        >
          {action.label}
        </Text>
      )}

      {onClose && (
        <View className="ml-2">
          <X size={16} color="#a1a1aa" onPress={onClose} />
        </View>
      )}
    </Animated.View>
  );
}

// ─── Toast Presets ───────────────────────────────────────────────────────────

export function ToastSuccess({
  message,
  onClose,
}: {
  message: string;
  onClose?: () => void;
}) {
  return <Toast variant="success" message={message} onClose={onClose} />;
}

export function ToastError({
  message,
  onClose,
}: {
  message: string;
  onClose?: () => void;
}) {
  return <Toast variant="error" message={message} onClose={onClose} />;
}

export function ToastWarning({
  message,
  onClose,
}: {
  message: string;
  onClose?: () => void;
}) {
  return <Toast variant="warning" message={message} onClose={onClose} />;
}

export function ToastInfo({
  message,
  onClose,
}: {
  message: string;
  onClose?: () => void;
}) {
  return <Toast variant="info" message={message} onClose={onClose} />;
}
