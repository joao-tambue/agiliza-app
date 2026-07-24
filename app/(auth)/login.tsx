import { Button, Input } from "@/components";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    setLoading(true);
    // TODO: integrar com auth
    setTimeout(() => setLoading(false), 1500);
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
              <View
                className="h-[92px] w-[92px] items-center justify-center rounded-full bg-primary-100"
                style={{
                  shadowColor: "#7c3aed",
                  shadowOpacity: 0.08,
                  shadowRadius: 14,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 2,
                }}
              >
                <View className="h-[68px] w-[68px] items-center justify-center rounded-full bg-primary-600">
                  <Lock size={28} color="#FFFFFF" />
                </View>
              </View>
            </View>

            <Text className="mb-2 text-lg font-medium text-neutral-800">
              Entrar
            </Text>

            <Text className="mb-8 text-sm text-neutral-500">
              Bem-vindo de volta! Faca login para continuar.
            </Text>

            <View className="w-full">
              <Input
                label="Email ou numero de telefone"
                placeholder="Digite o seu email ou numero de tel"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                leftIcon={<Mail size={18} color="#D4D4D8" />}
              />

              <Input
                label="Senha"
                placeholder="Digite a sua senha"
                variant="password"
                value={password}
                onChangeText={setPassword}
                leftIcon={<Lock size={18} color="#D4D4D8" />}
              />

              <View className="mb-2 flex-row justify-end">
                <Link href="/(auth)/forgot-password" asChild>
                  <Text className="text-xs font-medium text-primary-600">
                    Esqueceu a senha?
                  </Text>
                </Link>
              </View>

              <Button
                title="Entrar"
                fullWidth
                loading={loading}
                onPress={handleLogin}
              />
            </View>

            <View className="mt-6 flex-row items-center justify-center">
              <Text className="text-sm text-neutral-500">Nao tem conta? </Text>
              <Link href="/(auth)/register" asChild>
                <Text className="text-sm font-semibold text-primary-600">
                  Criar conta
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
