import { Button, Input } from "@/components";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyRound, Mail } from "lucide-react-native";
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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSendLink() {
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
                  <KeyRound size={28} color="#FFFFFF" />
                </View>
              </View>
            </View>

            <Text className="mb-2 text-lg font-medium text-neutral-800">
              Esqueceu a senha?
            </Text>

            <Text className="mb-8 text-center text-sm text-neutral-500">
              Insira o seu email e enviaremos um link para{"\n"}redefinir a sua
              senha.
            </Text>

            <View className="w-full">
              <Input
                label="Email"
                placeholder="Digite o seu email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                leftIcon={<Mail size={18} color="#D4D4D8" />}
              />

              <View className="mt-3">
                <Button
                  title="Enviar link"
                  fullWidth
                  loading={loading}
                  onPress={handleSendLink}
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
