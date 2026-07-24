import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function ForgotPasswordScreen() {
  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <Text className="text-display-md font-outfit text-neutral-900 mb-2">
        Esqueceu a senha?
      </Text>

      <Text className="text-body-md text-neutral-500 mb-8">
        Insira o seu email e enviaremos um link para redefinir a sua senha.
      </Text>

      <View className="gap-4">
        <View className="bg-neutral-100 rounded-xl px-4 py-4">
          <Text className="text-neutral-400">Email</Text>
        </View>

        <View className="bg-primary-600 rounded-xl py-4 items-center mt-2">
          <Text className="text-white text-base font-semibold">
            Enviar link
          </Text>
        </View>
      </View>

      <View className="items-center mt-6">
        <Link href="/(auth)/login" asChild>
          <Text className="text-body-sm text-primary-600 font-semibold">
            Voltar ao login
          </Text>
        </Link>
      </View>
    </View>
  );
}
