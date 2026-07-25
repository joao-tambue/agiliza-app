import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  CreditCard,
  MapPin,
  Shield,
  HelpCircle,
  LogOut,
  Moon,
  Star,
} from "lucide-react-native";
import { useAuth } from "@/context/AuthContext";
import { Modal, Button } from "@/components";

const menuSections = [
  {
    title: "Conta",
    items: [
      { key: "payments", label: "Pagamentos", icon: CreditCard, color: "#4F46E5" },
      { key: "addresses", label: "Enderecos", icon: MapPin, color: "#22C55E" },
      { key: "reviews", label: "Avaliacoes", icon: Star, color: "#F59E0B" },
    ],
  },
  {
    title: "Preferencias",
    items: [
      { key: "notifications", label: "Notificacoes", icon: Bell, color: "#EF4444" },
      { key: "appearance", label: "Apariencia", icon: Moon, color: "#8B5CF6" },
      { key: "privacy", label: "Privacidade", icon: Shield, color: "#06B6D4" },
    ],
  },
  {
    title: "Suporte",
    items: [
      { key: "help", label: "Ajuda", icon: HelpCircle, color: "#6B7280" },
    ],
  },
];

export default function ProfileTab() {
  const { user, signOut, isLoading } = useAuth();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  async function handleLogout() {
    setShowLogoutModal(false);
    await signOut();
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F8]" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HEADER */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
          <Text className="text-[26px] font-bold text-[#1A1A1A]">Perfil</Text>
          <TouchableOpacity
          onPress={() => router.push("/(main)/notifications")}
          className="relative h-11 w-11 items-center justify-center"
        >
            <Bell size={22} color="#1A1A1A" />
            <View className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </TouchableOpacity>
        </View>

        {/* USER CARD */}
        <View className="mx-5 mb-6 rounded-3xl bg-[#4F46E5] p-5">
          <View className="flex-row items-center">
            <Image
              source={{
                uri: user?.avatar || "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600",
              }}
              className="h-16 w-16 rounded-full border-2 border-white/20"
            />
            <View className="ml-4 flex-1">
              <Text className="text-[20px] font-bold text-white">
                {user?.name || "Utilizador"}
              </Text>
              <Text className="mt-0.5 text-sm text-white/70">
                {user?.email || "email@exemplo.com"}
              </Text>
              <View className="mt-2 flex-row items-center">
                <View className="rounded-full bg-white/20 px-3 py-1">
                  <Text className="text-xs font-medium text-white">
                    {user?.role === "lavadeira" ? "Lavadeira" : "Cliente"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* STATS */}
        <View className="mx-5 mb-6 flex-row rounded-2xl bg-white p-4 shadow-sm">
          <View className="flex-1 items-center">
            <Text className="text-[22px] font-bold text-[#4F46E5]">12</Text>
            <Text className="mt-1 text-xs text-[#8F8F8F]">Servicos</Text>
          </View>
          <View className="w-px bg-neutral-100" />
          <View className="flex-1 items-center">
            <Text className="text-[22px] font-bold text-[#4F46E5]">4.8</Text>
            <Text className="mt-1 text-xs text-[#8F8F8F]">Avaliacao</Text>
          </View>
          <View className="w-px bg-neutral-100" />
          <View className="flex-1 items-center">
            <Text className="text-[22px] font-bold text-[#4F46E5]">2</Text>
            <Text className="mt-1 text-xs text-[#8F8F8F]">Favoritos</Text>
          </View>
        </View>

        {/* MENU SECTIONS */}
        {menuSections.map((section) => (
          <View key={section.title} className="mx-5 mb-4">
            <Text className="mb-2 text-xs font-semibold uppercase text-[#8F8F8F]">
              {section.title}
            </Text>
            <View className="rounded-2xl bg-white shadow-sm">
              {section.items.map((item, idx) => (
                <TouchableOpacity
                  key={item.key}
                  className={`flex-row items-center px-4 py-3.5 ${
                    idx < section.items.length - 1 ? "border-b border-neutral-50" : ""
                  }`}
                >
                  <View
                    className="h-9 w-9 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon size={18} color={item.color} />
                  </View>
                  <Text className="ml-3 flex-1 text-[15px] font-medium text-[#1A1A1A]">
                    {item.label}
                  </Text>
                  <ChevronRight size={18} color="#C4C4C4" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* LOGOUT */}
        <View className="mx-5 mt-2">
          <TouchableOpacity
            onPress={() => setShowLogoutModal(true)}
            className="flex-row items-center justify-center rounded-2xl border border-red-100 bg-white py-4"
          >
            <LogOut size={20} color="#EF4444" />
            <Text className="ml-2 text-[15px] font-semibold text-red-500">
              Sair da conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* LOGOUT MODAL */}
      <Modal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Terminar sessao"
        showCloseButton={false}
      >
        <Text className="text-sm leading-5 text-neutral-500 mb-6">
          Tem certeza que deseja terminar a sessao? Precisara voltar a entrar
          para aceder a sua conta.
        </Text>

        <View className="gap-3">
          <Button
            title="Terminar sessao"
            variant="danger"
            fullWidth
            loading={isLoading}
            onPress={handleLogout}
          />
          <Button
            title="Cancelar"
            variant="ghost"
            fullWidth
            onPress={() => setShowLogoutModal(false)}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
