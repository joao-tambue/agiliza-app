import "../global.css";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

function RootLayoutInner() {
  useProtectedRoute();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutInner />
    </AuthProvider>
  );
}
