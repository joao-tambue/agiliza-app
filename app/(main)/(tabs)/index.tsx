import { Chip } from "@/components";
import { mamas } from "@/data/mamas";
import { useRouter } from "expo-router";
import { Bell, MapPin, Search, Star } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const featuredMamas = mamas.filter((m) => [4, 5].includes(m.id));

const filters = [
  { key: "all", label: "Todos" },
  { key: "proximity", label: "Proximidade" },
  { key: "lavadeiras", label: "Lavadeiras" },
];

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F8]" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HERO */}
        <View className="bg-[#4F46E5] overflow-hidden rounded-b-[32px]">
          <Image
            source={require("@/assets/iluu/Texture.png")}
            resizeMode="cover"
            className="absolute inset-0 h-full w-full"
          />

          <View className="px-5 pt-4 pb-8">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 flex-row items-center">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600",
                  }}
                  className="h-14 w-14 rounded-full border-2 border-white/20"
                />

                <View className="ml-3 flex-1">
                  <Text className="text-[15px] text-white/80">
                    Ola, Bem-vinda
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-[30px] font-bold text-white"
                  >
                    Luisa Timoteo
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => router.push("/(main)/notifications")}
                className="h-12 w-12 items-center justify-center bg-white/20 rounded-full"
              >
                <Bell size={24} color="#fff" />
                <View className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
              </TouchableOpacity>
            </View>

            {/* SEARCH */}
            <View className="mt-7 h-14 flex-row items-center rounded-2xl border border-white/15 bg-white/5 px-4">
              <Search size={20} color="#CFCDF8" />
              <TextInput
                placeholder="Procurar por bairro (ex: Cacuaco...)"
                placeholderTextColor="#CFCDF8"
                value={search}
                onChangeText={setSearch}
                className="ml-3 flex-1 text-[15px] text-white"
              />
            </View>
          </View>
        </View>

        {/* FILTROS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
        >
          {filters.map((f) => (
            <Chip
              key={f.key}
              label={f.label}
              variant="category"
              size="lg"
              selected={activeFilter === f.key}
              onPress={() => setActiveFilter(f.key)}
              leftIcon={
                f.key === "all" || f.key === "proximity" ? (
                  <MapPin
                    size={16}
                    color={activeFilter === f.key ? "#fff" : "#666"}
                  />
                ) : undefined
              }
              style={{ marginRight: 12 }}
            />
          ))}
        </ScrollView>

        {/* MAMAS EM DESTAQUE */}
        <View className="mt-8">
          <View className="flex-row items-center justify-between px-5">
            <Text className="text-[22px] font-semibold text-[#1A1A1A]">
              Mamas em Destaque
            </Text>
            <TouchableOpacity>
              <Text className="font-medium text-[#4F46E5]">Ver todas</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 20,
              paddingRight: 8,
              paddingTop: 16,
            }}
          >
            {featuredMamas.map((mama) => (
              <TouchableOpacity
                key={mama.id}
                onPress={() => router.push(`/(main)/mama/${mama.id}`)}
                className="mr-4 w-[170px]"
              >
                <Image
                  source={{ uri: mama.image }}
                  className="h-[160px] w-full rounded-3xl"
                />
                <View className="mt-3">
                  <View className="flex-row items-center justify-between">
                    <Text
                      numberOfLines={1}
                      className="text-[18px] font-semibold text-[#1A1A1A]"
                    >
                      {mama.name}
                    </Text>
                    <View className="flex-row items-center">
                      <Star size={14} fill="#FBBF24" color="#FBBF24" />
                      <Text className="ml-1 font-medium text-[#1A1A1A]">
                        {mama.rating}
                      </Text>
                    </View>
                  </View>
                  <Text className="mt-1 text-sm text-[#9A9A9A]">
                    {mama.location}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* TODAS MAMAS */}
        <View className="mt-8 px-5">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-[22px] font-semibold text-[#1A1A1A]">
              Todas mamas
            </Text>
            <TouchableOpacity>
              <Text className="font-medium text-[#4F46E5]">Ver todas</Text>
            </TouchableOpacity>
          </View>

          {mamas.map((mama) => (
            <TouchableOpacity
              key={mama.id}
              onPress={() => router.push(`/(main)/mama/${mama.id}`)}
              className="mb-4 flex-row items-center rounded-3xl bg-white p-4 shadow-sm"
            >
              <Image
                source={{ uri: mama.image }}
                className="h-20 w-20 rounded-2xl"
              />
              <View className="ml-4 flex-1">
                <Text className="text-[20px] font-semibold text-[#1A1A1A]">
                  {mama.name}
                </Text>
                <Text className="mt-1 text-sm text-[#8F8F8F]">
                  {mama.profession}
                </Text>
                <Text className="text-sm text-[#8F8F8F]">{mama.location}</Text>
                <View className="mt-3 flex-row items-center">
                  <Star size={15} fill="#FBBF24" color="#FBBF24" />
                  <Text className="ml-1 font-semibold">{mama.rating}</Text>
                  <Text className="ml-2 text-sm text-[#8F8F8F]">
                    (+{mama.services} servicos prestados)
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
