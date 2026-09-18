import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Bell,
  BellOff,
  Star,
  Calendar,
  MessageCircle,
  CheckCircle,
} from "lucide-react-native";

const notifications = [
  {
    id: 1,
    type: "rating",
    title: "Nova avaliacao recebida",
    message: "Maria Fernandes deixou uma avaliacao de 5 estrelas no servico.",
    time: "Ha 5 minutos",
    read: false,
    icon: Star,
    color: "#F59E0B",
  },
  {
    id: 2,
    type: "booking",
    title: "Servico confirmado",
    message: "Priscila Sousa confirmou o servico para amanha as 09:00.",
    time: "Ha 1 hora",
    read: false,
    icon: Calendar,
    color: "#4F46E5",
  },
  {
    id: 3,
    type: "message",
    title: "Nova mensagem",
    message: "Joana Neto enviou uma mensagem: 'Obrigada pelo servico!'",
    time: "Ha 3 horas",
    read: true,
    icon: MessageCircle,
    color: "#22C55E",
  },
  {
    id: 4,
    type: "completed",
    title: "Servico concluido",
    message: "O servico com Rosa Domingos foi finalizado com sucesso.",
    time: "Ontem",
    read: true,
    icon: CheckCircle,
    color: "#06B6D4",
  },
  {
    id: 5,
    type: "rating",
    title: "Avaliacao pendente",
    message: "Nao esqueca de avaliar o servico com Odete Kiala.",
    time: "Ontem",
    read: true,
    icon: Star,
    color: "#F59E0B",
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F8]" edges={["top"]}>
      {/* HEADER */}
      <View className="flex-row items-center border-b border-neutral-100 bg-white px-5 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-neutral-100"
        >
          <ArrowLeft size={20} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="flex-1 text-[20px] font-bold text-[#1A1A1A]">
          Notificacoes
        </Text>
        {unread > 0 && (
          <View className="rounded-full bg-red-500 px-2.5 py-0.5">
            <Text className="text-xs font-semibold text-white">{unread}</Text>
          </View>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {notifications.length === 0 ? (
          <View className="flex-1 items-center pt-20">
            <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-neutral-100">
              <BellOff size={36} color="#a1a1aa" />
            </View>
            <Text className="text-xl font-semibold text-[#1A1A1A]">
              Sem notificacoes
            </Text>
            <Text className="mt-2 text-center text-sm text-[#8F8F8F]">
              As suas notificacoes aparecerao aqui.
            </Text>
          </View>
        ) : (
          <>
            {unread > 0 && (
              <Text className="px-5 pb-2 pt-4 text-xs font-semibold uppercase text-[#8F8F8F]">
                Nao lidas
              </Text>
            )}

            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <TouchableOpacity
                  key={notif.id}
                  className={`mx-5 mb-3 flex-row rounded-2xl p-4 ${
                    notif.read ? "bg-white" : "bg-[#F0EDFF]"
                  }`}
                  style={{
                    shadowColor: "#000",
                    shadowOpacity: notif.read ? 0.02 : 0.04,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 1,
                  }}
                >
                  <View
                    className="h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${notif.color}15` }}
                  >
                    <Icon size={18} color={notif.color} />
                  </View>
                  <View className="ml-3 flex-1">
                    <View className="flex-row items-center">
                      <Text
                        className={`flex-1 text-[15px] font-semibold ${
                          notif.read ? "text-[#1A1A1A]" : "text-[#1A1A1A]"
                        }`}
                      >
                        {notif.title}
                      </Text>
                      {!notif.read && (
                        <View className="h-2 w-2 rounded-full bg-[#4F46E5]" />
                      )}
                    </View>
                    <Text className="mt-1 text-sm leading-5 text-[#8F8F8F]">
                      {notif.message}
                    </Text>
                    <Text className="mt-2 text-xs text-[#C4C4C4]">
                      {notif.time}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
