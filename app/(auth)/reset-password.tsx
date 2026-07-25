import { Button, Input } from "@/components";
import { useResetPassword } from "@/hooks/useAuth";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyRound, Lock } from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function ResetPasswordScreen() {
  const params = useLocalSearchParams<{ phone?: string }>();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const router = useRouter();
  const { handleResetPassword, isLoading, error, success } =
    useResetPassword();

  function handleReset() {
    setLocalError(null);

    if (password.length < 6) {
      setLocalError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("As senhas nao coincidem.");
      return;
    }

    handleResetPassword(token, password).then(() => {
      router.replace("/(auth)/login");
    });
  }

  const displayError = localError || error;

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
              Redefinir senha
            </Text>

            <Text className="mb-8 text-center text-sm text-neutral-500">
              Insira o codigo recebido por SMS e a sua nova senha.
            </Text>

            <View className="w-full">
              {displayError && (
                <View className="mb-3 rounded-lg bg-red-50 px-4 py-3">
                  <Text className="text-center text-sm text-red-600">
                    {displayError}
                  </Text>
                </View>
              )}

              {success && (
                <View className="mb-3 rounded-lg bg-green-50 px-4 py-3">
                  <Text className="text-center text-sm text-green-600">
                    Senha redefinida com sucesso! Pode fazer login.
                  </Text>
                </View>
              )}

              <Input
                label="Codigo de verificacao"
                placeholder="Digite o codigo recebido"
                keyboardType="number-pad"
                maxLength={6}
                value={token}
                onChangeText={setToken}
              />

              <Input
                label="Nova senha"
                placeholder="Crie uma nova senha"
                variant="password"
                value={password}
                onChangeText={setPassword}
                leftIcon={<Lock size={18} color="#D4D4D8" />}
              />

              <Input
                label="Confirmar senha"
                placeholder="Repita a nova senha"
                variant="password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                leftIcon={<Lock size={18} color="#D4D4D8" />}
              />

              <View className="mt-3">
                <Button
                  title="Redefinir senha"
                  fullWidth
                  loading={isLoading}
                  onPress={handleReset}
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
