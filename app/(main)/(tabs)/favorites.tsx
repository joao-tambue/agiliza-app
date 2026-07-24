import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Star, Heart, Bell } from "lucide-react-native";
import { EmptyFavorites } from "@/components";

const favoriteMamas = [
  {
    id: 1,
    name: "Mama Maria",
    location: "Vila de Cacuaco",
    profession: "Lavadeira",
    rating: 5.0,
    services: 10,
    image: "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=600",
  },
  {
    id: 2,
    name: "Mama Priss",
    location: "Vila de Viana",
    profession: "Lavadeira",
    rating: 4.8,
    services: 15,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
  },
];

export default function FavoritesTab() {
  const hasFavorites = favoriteMamas.length > 0;
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F8]" edges={["top"]}>
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
        <Text className="text-[26px] font-bold text-[#1A1A1A]">Favoritos</Text>
        <TouchableOpacity
          onPress={() => router.push("/(main)/notifications")}
          className="relative h-11 w-11 items-center justify-center"
        >
          <Bell size={22} color="#1A1A1A" />
          <View className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
        </TouchableOpacity>
      </View>

      {!hasFavorites ? (
        <EmptyFavorites />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        >
          <Text className="mb-3 text-sm text-[#8F8F8F]">
            {favoriteMamas.length} mamae{favoriteMamas.length !== 1 ? "s" : ""} guardada{favoriteMamas.length !== 1 ? "s" : ""}
          </Text>

          {favoriteMamas.map((mama) => (
            <TouchableOpacity
              key={mama.id}
              className="mb-4 flex-row items-center rounded-3xl bg-white p-4 shadow-sm"
            >
              <Image
                source={{ uri: mama.image }}
                className="h-20 w-20 rounded-2xl"
              />
              <View className="ml-4 flex-1">
                <Text className="text-[18px] font-semibold text-[#1A1A1A]">
                  {mama.name}
                </Text>
                <Text className="mt-0.5 text-sm text-[#8F8F8F]">
                  {mama.profession}
                </Text>
                <Text className="text-sm text-[#8F8F8F]">{mama.location}</Text>
                <View className="mt-2 flex-row items-center">
                  <Star size={14} fill="#FBBF24" color="#FBBF24" />
                  <Text className="ml-1 text-sm font-semibold">
                    {mama.rating}
                  </Text>
                  <Text className="ml-2 text-xs text-[#8F8F8F]">
                    (+{mama.services} servicos)
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="h-10 w-10 items-center justify-center">
                <Heart size={22} color="#EF4444" fill="#EF4444" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
