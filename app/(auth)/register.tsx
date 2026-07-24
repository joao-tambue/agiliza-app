import { Button, Input } from "@/components";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Lock, Mail, User } from "lucide-react-native";
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

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleRegister() {
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
              <Image
                source={require("@/assets/iluu/check-mark.png")}
                className="h-[92px] w-[92px]"
                resizeMode="contain"
              />
            </View>

            <Text className="mb-8 text-lg font-medium text-neutral-800">
              Criar uma conta
            </Text>

            <View className="w-full">
              <Input
                label="Nome de usuario"
                placeholder="Digite o seu nome de usuario"
                value={name}
                onChangeText={setName}
                leftIcon={<User size={18} color="#D4D4D8" />}
              />

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

              <View className="mt-3">
                <Button
                  title="Registrar"
                  fullWidth
                  loading={loading}
                  onPress={handleRegister}
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
