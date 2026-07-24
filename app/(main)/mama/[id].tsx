import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Clock,
  BadgeCheck,
  Briefcase,
  Banknote,
} from "lucide-react-native";
import { Button } from "@/components";
import { getMamaById } from "@/data/mamas";

export default function MamaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const mama = getMamaById(Number(id));

  if (!mama) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-neutral-500">Mamae nao encontrada</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-primary-600 font-semibold">Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  function handleRequest() {
    Alert.alert(
      "Solicitar servico",
      `Deseja solicitar um servico com ${mama.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => Alert.alert("Pedido enviado!", "A mamae ira responder em breve.") },
      ]
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* COVER IMAGE */}
        <View className="relative h-[320px]">
          <Image
            source={{ uri: mama.image }}
            className="h-full w-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />

          {/* BACK BUTTON */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-5 top-4 h-10 w-10 items-center justify-center rounded-full bg-white/90"
          >
            <ArrowLeft size={20} color="#1A1A1A" />
          </TouchableOpacity>

          {/* AVAILABLE BADGE */}
          <View className="absolute right-5 top-4">
            <View
              className={`flex-row items-center rounded-full px-3 py-1.5 ${
                mama.available ? "bg-green-500/90" : "bg-neutral-500/90"
              }`}
            >
              <View
                className={`mr-1.5 h-2 w-2 rounded-full ${
                  mama.available ? "bg-white" : "bg-white/60"
                }`}
              />
              <Text className="text-xs font-semibold text-white">
                {mama.available ? "Disponivel" : "Indisponivel"}
              </Text>
            </View>
          </View>

          {/* NAME OVERLAY */}
          <View className="absolute bottom-0 left-0 right-0 px-5 pb-5">
            <Text className="text-[28px] font-bold text-white">{mama.name}</Text>
            <View className="mt-1 flex-row items-center">
              <MapPin size={14} color="rgba(255,255,255,0.8)" />
              <Text className="ml-1 text-sm text-white/80">{mama.location}</Text>
            </View>
          </View>
        </View>

        {/* RATING & SERVICES */}
        <View className="flex-row items-center border-b border-neutral-100 px-5 py-4">
          <View className="flex-1 flex-row items-center">
            <Star size={20} fill="#FBBF24" color="#FBBF24" />
            <Text className="ml-1 text-[20px] font-bold">{mama.rating}</Text>
            <Text className="ml-1 text-sm text-[#8F8F8F]">avaliacao</Text>
          </View>
          <View className="h-8 w-px bg-neutral-200" />
          <View className="flex-1 items-center">
            <Text className="text-[20px] font-bold">{mama.services}</Text>
            <Text className="text-sm text-[#8F8F8F]">servicos</Text>
          </View>
        </View>

        {/* INFO CARDS */}
        <View className="flex-row px-5 py-4">
          <View className="mr-3 flex-1 items-center rounded-2xl bg-[#F0EDFF] py-4">
            <Briefcase size={20} color="#4F46E5" />
            <Text className="mt-2 text-sm font-semibold text-[#4F46E5]">
              {mama.experience}
            </Text>
            <Text className="text-xs text-[#8F8F8F]">Experiencia</Text>
          </View>
          <View className="mr-3 flex-1 items-center rounded-2xl bg-[#ECFDF5] py-4">
            <Banknote size={20} color="#22C55E" />
            <Text className="mt-2 text-sm font-semibold text-[#22C55E]">
              {mama.hourlyRate}
            </Text>
            <Text className="text-xs text-[#8F8F8F]">Preco/hora</Text>
          </View>
          <View className="flex-1 items-center rounded-2xl bg-[#FEF9C3] py-4">
            <BadgeCheck size={20} color="#F59E0B" />
            <Text className="mt-2 text-sm font-semibold text-[#F59E0B]">
              Verificada
            </Text>
            <Text className="text-xs text-[#8F8F8F]">Perfil</Text>
          </View>
        </View>

        {/* CONTACT */}
        <View className="mx-5 rounded-2xl bg-neutral-50 p-4">
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#4F46E5]/10">
              <Phone size={18} color="#4F46E5" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-xs text-[#8F8F8F]">Contacto</Text>
              <Text className="text-[15px] font-medium text-[#1A1A1A]">
                {mama.phone}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Clock size={14} color="#8F8F8F" />
              <Text className="ml-1 text-xs text-[#8F8F8F]">Responde rapido</Text>
            </View>
          </View>
        </View>

        {/* BIO */}
        <View className="mt-5 px-5">
          <Text className="mb-2 text-[17px] font-semibold text-[#1A1A1A]">
            Sobre
          </Text>
          <Text className="text-[15px] leading-6 text-[#4A4A4A]">
            {mama.bio}
          </Text>
        </View>

        {/* REVIEWS PREVIEW */}
        <View className="mt-6 px-5">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-[17px] font-semibold text-[#1A1A1A]">
              Avaliacoes
            </Text>
            <TouchableOpacity>
              <Text className="text-sm font-medium text-[#4F46E5]">
                Ver todas
              </Text>
            </TouchableOpacity>
          </View>

          <View className="rounded-2xl bg-neutral-50 p-4">
            <View className="flex-row items-center">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
                }}
                className="h-10 w-10 rounded-full"
              />
              <View className="ml-3 flex-1">
                <Text className="text-sm font-semibold text-[#1A1A1A]">
                  Maria T.
                </Text>
                <View className="flex-row items-center">
                  <Star size={12} fill="#FBBF24" color="#FBBF24" />
                  <Star size={12} fill="#FBBF24" color="#FBBF24" />
                  <Star size={12} fill="#FBBF24" color="#FBBF24" />
                  <Star size={12} fill="#FBBF24" color="#FBBF24" />
                  <Star size={12} fill="#FBBF24" color="#FBBF24" />
                </View>
              </View>
              <Text className="text-xs text-[#C4C4C4]">Ha 2 dias</Text>
            </View>
            <Text className="mt-3 text-sm leading-5 text-[#4A4A4A]">
              Excelente servico! As minhas roupas ficaram impecaveis. Recomendo
              a todas as mamaes!
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* STICKY BOTTOM BUTTON */}
      <View className="border-t border-neutral-100 bg-white px-5 py-4">
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-xs text-[#8F8F8F]">Preco estimado</Text>
            <Text className="text-[18px] font-bold text-[#1A1A1A]">
              {mama.hourlyRate}
            </Text>
          </View>
          <View
            className={`rounded-full px-3 py-1 ${
              mama.available ? "bg-green-50" : "bg-neutral-100"
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                mama.available ? "text-green-600" : "text-neutral-500"
              }`}
            >
              {mama.available ? "Disponivel agora" : "Indisponivel"}
            </Text>
          </View>
        </View>
        <Button
          title="Solicitar servico"
          fullWidth
          size="lg"
          disabled={!mama.available}
          onPress={handleRequest}
        />
      </View>
    </SafeAreaView>
  );
}
