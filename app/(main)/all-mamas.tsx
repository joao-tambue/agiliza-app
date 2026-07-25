import { Chip, SearchBar } from "@/components";
import { Mama, mamas } from "@/data/mamas";
import { useRouter } from "expo-router";
import { ArrowLeft, Bell, SlidersHorizontal, Star } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sortOptions = [
  { key: "rating", label: "Melhor avaliacao" },
  { key: "services", label: "Mais servicos" },
  { key: "name", label: "Nome A-Z" },
];

function MamaGridCard({ mama, onPress }: { mama: Mama; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} className="mb-4 flex-1 mx-1.5">
      <View className="rounded-2xl bg-white overflow-hidden shadow-sm">
        <Image source={{ uri: mama.image }} className="h-[140px] w-full" />
        <View className="p-3">
          <Text
            numberOfLines={1}
            className="text-[15px] font-semibold text-[#1A1A1A]"
          >
            {mama.name}
          </Text>
          <Text className="mt-0.5 text-xs text-[#8F8F8F]">
            {mama.profession}
          </Text>
          <View className="mt-1 flex-row items-center">
            <Star size={12} fill="#FBBF24" color="#FBBF24" />
            <Text className="ml-1 text-xs font-semibold text-[#1A1A1A]">
              {mama.rating}
            </Text>
            <Text className="ml-1 text-[10px] text-[#C4C4C4]">
              ({mama.services})
            </Text>
          </View>
          <View className="mt-2 flex-row items-center">
            <View
              className={`h-1.5 w-1.5 rounded-full ${
                mama.available ? "bg-green-500" : "bg-neutral-300"
              }`}
            />
            <Text className="ml-1 text-[10px] text-[#8F8F8F]">
              {mama.available ? "Disponivel" : "Indisponivel"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function AllMamasScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeSort, setActiveSort] = useState("rating");

  const filtered = mamas
    .filter((m) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        m.profession.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (activeSort === "rating") return b.rating - a.rating;
      if (activeSort === "services") return b.services - a.services;
      return a.name.localeCompare(b.name);
    });

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F8]" edges={["top"]}>
      <View className="flex-row items-center border-b border-neutral-100 bg-white px-5 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-neutral-100"
        >
          <ArrowLeft size={20} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="flex-1 text-[20px] font-bold text-[#1A1A1A]">
          Todas as mamas
        </Text>
        <TouchableOpacity className="relative h-10 w-10 items-center justify-center">
          <Bell size={20} color="#1A1A1A" />
          <View className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </TouchableOpacity>
      </View>

      <View className="px-5 pt-4 pb-3">
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Pesquisar mamae..."
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
      >
        {sortOptions.map((s) => (
          <Chip
            key={s.key}
            label={s.label}
            variant="category"
            size="lg"
            selected={activeSort === s.key}
            onPress={() => setActiveSort(s.key)}
            leftIcon={
              s.key === "rating" ? (
                <SlidersHorizontal
                  size={14}
                  color={activeSort === s.key ? "#fff" : "#666"}
                />
              ) : undefined
            }
            style={{ marginRight: 10 }}
          />
        ))}
      </ScrollView>

      {/* GRID */}
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 120 }}
        columnWrapperStyle={{ justifyContent: "center" }}
        ListEmptyComponent={
          <View className="items-center pt-20">
            <Text className="text-base text-[#8F8F8F]">
              Nenhuma mamae encontrada
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <MamaGridCard
            mama={item}
            onPress={() => router.push(`/(main)/mama/${item.id}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}
