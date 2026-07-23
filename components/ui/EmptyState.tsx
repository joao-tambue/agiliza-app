import React from "react";
import { View, Text } from "react-native";
import { LucideIcon, SearchX, Inbox, AlertCircle, WifiOff } from "lucide-react-native";

// ─── Types ───────────────────────────────────────────────────────────────────

export type EmptyStateVariant = "search" | "list" | "error" | "offline" | "custom";

export interface EmptyStateProps {
  /** Variante do empty state */
  variant?: EmptyStateVariant;
  /** Título */
  title: string;
  /** Descrição */
  description?: string;
  /** Ícone customizado */
  icon?: LucideIcon;
  /** Ação principal */
  action?: React.ReactNode;
}

// ─── Default Icons ───────────────────────────────────────────────────────────

const defaultIcons: Record<EmptyStateVariant, LucideIcon> = {
  search: SearchX,
  list: Inbox,
  error: AlertCircle,
  offline: WifiOff,
  custom: Inbox,
};

// ─── Component ───────────────────────────────────────────────────────────────

export function EmptyState({
  variant = "list",
  title,
  description,
  icon: CustomIcon,
  action,
}: EmptyStateProps) {
  const IconComponent = CustomIcon || defaultIcons[variant];

  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      <View className="w-20 h-20 rounded-full bg-neutral-100 items-center justify-center mb-6">
        <IconComponent size={36} color="#a1a1aa" />
      </View>

      <Text className="text-xl font-semibold text-neutral-900 text-center mb-2">
        {title}
      </Text>

      {description && (
        <Text className="text-base text-neutral-500 text-center mb-6 leading-6">
          {description}
        </Text>
      )}

      {action}
    </View>
  );
}

// ─── Preset Empty States ─────────────────────────────────────────────────────

export function EmptySearch({ query }: { query?: string }) {
  return (
    <EmptyState
      variant="search"
      title="Nenhum resultado encontrado"
      description={
        query
          ? `Não encontramos nada para "${query}". Tente pesquisar com outros termos.`
          : "Pesquise por nome, bairro ou tipo de serviço."
      }
    />
  );
}

export function EmptyFavorites() {
  return (
    <EmptyState
      variant="list"
      title="Sem favoritos ainda"
      description="Toque no coração de uma mamãe lavadeira para guardar aqui."
    />
  );
}

export function EmptyOrders() {
  return (
    <EmptyState
      variant="list"
      title="Sem pedidos"
      description="Quando solicitar um serviço, ele aparecerá aqui."
    />
  );
}

export function ErrorState({
  title = "Algo correu mal",
  description = "Tente novamente mais tarde.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <EmptyState variant="error" title={title} description={description} />
  );
}

export function OfflineState() {
  return (
    <EmptyState
      variant="offline"
      title="Sem ligação à internet"
      description="Verifique a sua ligação e tente novamente."
    />
  );
}
