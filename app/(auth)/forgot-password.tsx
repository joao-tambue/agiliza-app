import { Button, Input } from "@/components";
import { useForgotPassword } from "@/hooks/useAuth";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyRound, Phone } from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function ForgotPasswordScreen() {
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const { handleForgotPassword, isLoading, error, success } =
    useForgotPassword();

  function handleSendCode() {
    handleForgotPassword(phone).then(() => {
      // Navigate to reset-password screen with phone context
      router.push({
        pathname: "/(auth)/reset-password",
        params: { phone },
      });
    });
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
                  <KeyRound size={28} color="#FFFFFF" />
                </View>
              </View>
            </View>

            <Text className="mb-2 text-lg font-medium text-neutral-800">
              Esqueceu a senha?
            </Text>

            <Text className="mb-8 text-center text-sm text-neutral-500">
              Insira o seu numero de telefone e enviaremos um{"\n"}codigo para
              redefinir a sua senha.
            </Text>

            <View className="w-full">
              {error && (
                <View className="mb-3 rounded-lg bg-red-50 px-4 py-3">
                  <Text className="text-center text-sm text-red-600">
                    {error}
                  </Text>
                </View>
              )}

              {success && (
                <View className="mb-3 rounded-lg bg-green-50 px-4 py-3">
                  <Text className="text-center text-sm text-green-600">
                    Codigo enviado! Verifique o seu telemovel.
                  </Text>
                </View>
              )}

              <Input
                label="Numero de telefone"
                placeholder="9XX XXX XXX"
                keyboardType="phone-pad"
                autoComplete="tel"
                value={phone}
                onChangeText={setPhone}
                leftIcon={<Phone size={18} color="#D4D4D8" />}
              />

              <View className="mt-3">
                <Button
                  title="Enviar codigo"
                  fullWidth
                  loading={isLoading}
                  onPress={handleSendCode}
                />
              </View>
            </View>

            <View className="mt-6">
              <Link href="/(auth)/login" asChild>
                <Text className="text-sm font-semibold text-primary-600">
                  Voltar ao login
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
