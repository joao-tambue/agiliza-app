import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <Text className="text-display-md font-outfit text-neutral-900 mb-2">
        Entrar
      </Text>

      <Text className="text-body-md text-neutral-500 mb-8">
        Bem-vindo de volta! Faça login para continuar.
      </Text>

      <View className="gap-4">
        <View className="bg-neutral-100 rounded-xl px-4 py-4">
          <Text className="text-neutral-400">Email</Text>
        </View>

        <View className="bg-neutral-100 rounded-xl px-4 py-4">
          <Text className="text-neutral-400">Senha</Text>
        </View>

        <View className="bg-primary-600 rounded-xl py-4 items-center mt-2">
          <Text className="text-white text-base font-semibold">
            Entrar
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-center mt-6">
        <Text className="text-body-sm text-neutral-500">
          Não tem conta?{" "}
        </Text>
        <Link href="/(auth)/register" asChild>
          <Text className="text-body-sm text-primary-600 font-semibold">
            Criar conta
          </Text>
        </Link>
      </View>

      <View className="items-center mt-4">
        <Link href="/(auth)/forgot-password" asChild>
          <Text className="text-body-sm text-primary-600">
            Esqueceu a senha?
          </Text>
        </Link>
      </View>
    </View>
  );
}
