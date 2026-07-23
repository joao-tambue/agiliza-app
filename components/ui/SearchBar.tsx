import React from "react";
import { View, TextInput, Pressable } from "react-native";
import { Search, X, SlidersHorizontal } from "lucide-react-native";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SearchBarProps {
  /** Valor do campo */
  value: string;
  /** Callback de mudança */
  onChangeText: (text: string) => void;
  /** Placeholder */
  placeholder?: string;
  /** Mostrar botão de filtro */
  showFilter?: boolean;
  /** Callback do botão de filtro */
  onFilterPress?: () => void;
  /** Callback de foco */
  onFocus?: () => void;
  /** Callback de busca */
  onSubmitEditing?: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Pesquisar mamãe lavadeira...",
  showFilter = false,
  onFilterPress,
  onFocus,
  onSubmitEditing,
}: SearchBarProps) {
  return (
    <View className="flex-row items-center gap-2">
      <View className="flex-1 flex-row items-center bg-neutral-100 rounded-xl px-3 h-12">
        <Search size={20} color="#a1a1aa" />

        <TextInput
          className="flex-1 text-base text-neutral-900 ml-2"
          placeholder={placeholder}
          placeholderTextColor="#a1a1aa"
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />

        {value.length > 0 && (
          <Pressable
            onPress={() => onChangeText("")}
            className="p-1"
            accessibilityRole="button"
            accessibilityLabel="Limpar pesquisa"
          >
            <X size={18} color="#a1a1aa" />
          </Pressable>
        )}
      </View>

      {showFilter && (
        <Pressable
          className="w-12 h-12 rounded-xl bg-primary-600 items-center justify-center"
          onPress={onFilterPress}
          accessibilityRole="button"
          accessibilityLabel="Filtros"
        >
          <SlidersHorizontal size={20} color="#ffffff" />
        </Pressable>
      )}
    </View>
  );
}
