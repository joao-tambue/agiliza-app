import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function RegisterScreen() {
  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <Text className="text-display-md font-outfit text-neutral-900 mb-2">
        Criar conta
      </Text>

      <Text className="text-body-md text-neutral-500 mb-8">
        Preencha os dados para começar.
      </Text>

      <View className="gap-4">
        <View className="bg-neutral-100 rounded-xl px-4 py-4">
          <Text className="text-neutral-400">Nome completo</Text>
        </View>

        <View className="bg-neutral-100 rounded-xl px-4 py-4">
          <Text className="text-neutral-400">Email</Text>
        </View>

        <View className="bg-neutral-100 rounded-xl px-4 py-4">
          <Text className="text-neutral-400">Telefone</Text>
        </View>

        <View className="bg-neutral-100 rounded-xl px-4 py-4">
          <Text className="text-neutral-400">Senha</Text>
        </View>

        <View className="bg-primary-600 rounded-xl py-4 items-center mt-2">
          <Text className="text-white text-base font-semibold">
            Criar conta
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-center mt-6">
        <Text className="text-body-sm text-neutral-500">
          Já tem conta?{" "}
        </Text>
        <Link href="/(auth)/login" asChild>
          <Text className="text-body-sm text-primary-600 font-semibold">
            Entrar
          </Text>
        </Link>
      </View>
    </View>
  );
}
