import { Button, Input } from "@/components";
import { useVerifyPhone } from "@/hooks/useAuth";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ShieldCheck } from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function VerifyPhoneScreen() {
  const params = useLocalSearchParams<{ phone?: string }>();
  const [token, setToken] = useState("");
  const router = useRouter();
  const { handleVerifyPhone, isLoading, error, success } = useVerifyPhone();

  function handleVerify() {
    handleVerifyPhone(token).then(() => {
      router.replace("/(auth)/login");
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
                  <ShieldCheck size={28} color="#FFFFFF" />
                </View>
              </View>
            </View>

            <Text className="mb-2 text-lg font-medium text-neutral-800">
              Verificar telefone
            </Text>

            <Text className="mb-8 text-center text-sm text-neutral-500">
              Enviamos um codigo de 6 digitos para
              {params.phone ? ` ${params.phone}` : " o seu telefone"}.{"\n"}
              Insira o codigo abaixo.
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
                    Telefone verificado com sucesso!
                  </Text>
                </View>
              )}

              <Input
                label="Codigo de verificacao"
                placeholder="Digite o codigo de 6 digitos"
                keyboardType="number-pad"
                maxLength={6}
                value={token}
                onChangeText={setToken}
              />

              <View className="mt-3">
                <Button
                  title="Verificar"
                  fullWidth
                  loading={isLoading}
                  onPress={handleVerify}
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
