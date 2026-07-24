import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Star, MapPin, Bell } from "lucide-react-native";
import { SearchBar, Chip, EmptySearch } from "@/components";

const categories = [
  { key: "all", label: "Todos" },
  { key: "lavadeira", label: "Lavadeiras" },
  { key: "proximity", label: "Proximidade" },
  { key: "rating", label: "Melhor avaliacao" },
];

const allMamas = [
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
    name: "Mama Joana",
    location: "Vila de Benfica",
    profession: "Lavadeira",
    rating: 4.9,
    services: 8,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600",
  },
  {
    id: 3,
    name: "Mama Rosa",
    location: "Vila de Viana",
    profession: "Lavadeira",
    rating: 4.7,
    services: 12,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
  },
  {
    id: 4,
    name: "Mama Odeth",
    location: "Vila de Cacuaco",
    profession: "Lavadeira",
    rating: 4.5,
    services: 6,
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600",
  },
  {
    id: 5,
    name: "Mama Priss",
    location: "Vila de Viana",
    profession: "Lavadeira",
    rating: 4.8,
    services: 15,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
  },
];

export default function SearchTab() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const router = useRouter();

  const filtered = allMamas.filter((m) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.location.toLowerCase().includes(q) ||
      m.profession.toLowerCase().includes(q)
    );
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F8]" edges={["top"]}>
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
        <Text className="text-[26px] font-bold text-[#1A1A1A]">Pesquisar</Text>
        <TouchableOpacity
          onPress={() => router.push("/(main)/notifications")}
          className="relative h-11 w-11 items-center justify-center"
        >
          <Bell size={22} color="#1A1A1A" />
          <View className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
        </TouchableOpacity>
      </View>

      {/* SEARCH BAR */}
      <View className="px-5 mb-4">
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Pesquisar mamae por nome, bairro..."
        />
      </View>

      {/* CATEGORIES */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
      >
        {categories.map((c) => (
          <Chip
            key={c.key}
            label={c.label}
            variant="category"
            size="lg"
            selected={activeCategory === c.key}
            onPress={() => setActiveCategory(c.key)}
            style={{ marginRight: 10 }}
          />
        ))}
      </ScrollView>

      {/* RESULTS */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
      >
        {filtered.length === 0 ? (
          <EmptySearch query={search} />
        ) : (
          <>
            <Text className="mb-3 text-sm text-[#8F8F8F]">
              {filtered.length} mamae{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
            </Text>

            {filtered.map((mama) => (
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
                  <View className="mt-1 flex-row items-center">
                    <MapPin size={12} color="#8F8F8F" />
                    <Text className="ml-1 text-sm text-[#8F8F8F]">
                      {mama.location}
                    </Text>
                  </View>
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
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
