import { Button, Chip, Input } from "@/components";
import { useRegister } from "@/hooks/useAuth";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Lock, Phone, User } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import type { UserRole } from "@/api/types";

const roleOptions: { key: UserRole; label: string; description: string }[] = [
  { key: "CLIENT", label: "Cliente", description: "Contratar servicos" },
  { key: "LAVADEIRA", label: "Lavadeira", description: "Oferecer servicos" },
];

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("CLIENT");
  const { handleRegister, isLoading, error } = useRegister();

  function handleRegisterPress() {
    handleRegister({ name, phone, password, role });
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingBottom: 32,
          }}
        >
          <View className="flex-1 items-center justify-center">
            <View className="mb-10 items-center">
              <Image
                source={require("@/assets/iluu/check-mark.png")}
                className="h-[92px] w-[92px]"
                resizeMode="contain"
              />
            </View>

            <Text className="mb-2 text-lg font-medium text-neutral-800">
              Criar uma conta
            </Text>

            <Text className="mb-6 text-center text-sm text-neutral-500">
              Escolha o tipo de conta e preencha os seus dados.
            </Text>

            <View className="w-full">
              {error && (
                <View className="mb-3 rounded-lg bg-red-50 px-4 py-3">
                  <Text className="text-center text-sm text-red-600">
                    {error}
                  </Text>
                </View>
              )}

              <Text className="mb-2 text-sm font-medium text-neutral-700">
                Tipo de conta
              </Text>
              <View className="mb-4 flex-row gap-3">
                {roleOptions.map((option) => (
                  <Chip
                    key={option.key}
                    label={option.label}
                    variant="filter"
                    selected={role === option.key}
                    onPress={() => setRole(option.key)}
                  />
                ))}
              </View>

              <Input
                label="Nome completo"
                placeholder="Digite o seu nome"
                value={name}
                onChangeText={setName}
                leftIcon={<User size={18} color="#D4D4D8" />}
              />

              <Input
                label="Numero de telefone"
                placeholder="9XX XXX XXX"
                keyboardType="phone-pad"
                autoComplete="tel"
                value={phone}
                onChangeText={setPhone}
                leftIcon={<Phone size={18} color="#D4D4D8" />}
              />

              <Input
                label="Senha"
                placeholder="Crie uma senha"
                variant="password"
                value={password}
                onChangeText={setPassword}
                leftIcon={<Lock size={18} color="#D4D4D8" />}
              />

              <View className="mt-3">
                <Button
                  title="Registrar"
                  fullWidth
                  loading={isLoading}
                  onPress={handleRegisterPress}
                />
              </View>
            </View>

            <View className="mt-6 flex-row items-center justify-center">
              <Text className="text-sm text-neutral-500">Ja tem conta? </Text>
              <Link href="/(auth)/login" asChild>
                <Text className="text-sm font-semibold text-primary-600">
                  Entrar
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
