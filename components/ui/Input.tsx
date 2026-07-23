import React, { useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  Text,
  Pressable,
  ViewStyle,
} from "react-native";
import { Eye, EyeOff, Search, X } from "lucide-react-native";

// ─── Types ───────────────────────────────────────────────────────────────────

export type InputVariant = "default" | "search" | "password";
export type InputState = "default" | "error" | "success";

export interface InputProps extends Omit<TextInputProps, "style"> {
  /** Variante do input */
  variant?: InputVariant;
  /** Estado visual */
  inputState?: InputState;
  /** Label do input */
  label?: string;
  /** Mensagem de erro */
  error?: string;
  /** Mensagem de ajuda */
  helper?: string;
  /** Ícone à esquerda */
  leftIcon?: React.ReactNode;
  /** Estilo do container */
  containerStyle?: ViewStyle;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Input({
  variant = "default",
  inputState = "default",
  label,
  error,
  helper,
  leftIcon,
  containerStyle,
  value,
  onChangeText,
  secureTextEntry,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const stateStyle =
    inputState === "error"
      ? "border-danger-500"
      : inputState === "success"
        ? "border-success-500"
        : isFocused
          ? "border-primary-500"
          : "border-neutral-200";

  const borderColor =
    inputState === "error"
      ? "#ef4444"
      : inputState === "success"
        ? "#22c55e"
        : isFocused
          ? "#8b5cf6"
          : "#e4e4e7";

  return (
    <View className="mb-1" style={containerStyle}>
      {label && (
        <Text className="text-sm font-medium text-neutral-700 mb-1.5">
          {label}
        </Text>
      )}

      <View
        className={`
          flex-row items-center
          border rounded-lg bg-white
          ${stateStyle}
          ${props.editable === false ? "opacity-50" : ""}
        `}
        style={{
          borderWidth: 1.5,
          borderColor,
          minHeight: variant === "search" ? 44 : 48,
        }}
      >
        {variant === "search" && (
          <View className="pl-3">
            <Search size={20} color="#a1a1aa" />
          </View>
        )}

        {leftIcon && <View className="pl-3">{leftIcon}</View>}

        <TextInput
          className={`
            flex-1 text-base text-neutral-900
            ${variant === "search" ? "pl-2" : "pl-3"}
            pr-3
            ${variant === "search" ? "py-2.5" : "py-3"}
          `}
          placeholderTextColor="#a1a1aa"
          secureTextEntry={variant === "password" && !isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={props.editable}
          {...props}
        />

        {variant === "password" && (
          <Pressable
            className="pr-3"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            accessibilityRole="button"
            accessibilityLabel={
              isPasswordVisible ? "Ocultar senha" : "Mostrar senha"
            }
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color="#71717a" />
            ) : (
              <Eye size={20} color="#71717a" />
            )}
          </Pressable>
        )}

        {variant === "search" && value && value.length > 0 && (
          <Pressable
            className="pr-3"
            onPress={() => onChangeText?.("")}
            accessibilityRole="button"
            accessibilityLabel="Limpar pesquisa"
          >
            <X size={20} color="#a1a1aa" />
          </Pressable>
        )}
      </View>

      {(error || helper) && (
        <Text
          className={`text-xs mt-1 ${
            error ? "text-danger-500" : "text-neutral-400"
          }`}
        >
          {error || helper}
        </Text>
      )}
    </View>
  );
}
