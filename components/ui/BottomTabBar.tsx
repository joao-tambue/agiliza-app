import React from "react";
import { View, Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LucideIcon } from "lucide-react-native";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TabItem {
  key: string;
  label: string;
  icon: LucideIcon;
  /** Ícone quando ativo (opcional) */
  activeIcon?: LucideIcon;
  /** Badge de notificação */
  badge?: number;
}

export interface BottomTabBarProps {
  /** Itens da tab bar */
  items: TabItem[];
  /** Chave da tab ativa */
  activeKey: string;
  /** Callback quando tab é pressionada */
  onTabPress: (key: string) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function BottomTabBar({
  items,
  activeKey,
  onTabPress,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-white border-t border-neutral-100"
      style={{
        paddingBottom: Math.max(insets.bottom, 8),
        paddingTop: 8,
      }}
    >
      <View className="flex-row items-center justify-around">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          const IconComponent = isActive && item.activeIcon ? item.activeIcon : item.icon;
          const iconColor = isActive ? "#7c3aed" : "#a1a1aa";
          const iconSize = 24;

          return (
            <Pressable
              key={item.key}
              className="flex-1 items-center justify-center py-1"
              onPress={() => onTabPress(item.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={item.label}
            >
              <View className="relative">
                <IconComponent size={iconSize} color={iconColor} />

                {item.badge !== undefined && item.badge > 0 && (
                  <View className="absolute -top-1.5 -right-2 bg-danger-500 rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
                    <Text className="text-[10px] font-bold text-white">
                      {item.badge > 99 ? "99+" : item.badge}
                    </Text>
                  </View>
                )}
              </View>

              <Text
                className={`text-xs mt-1 ${
                  isActive
                    ? "text-primary-600 font-semibold"
                    : "text-neutral-400 font-medium"
                }`}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
