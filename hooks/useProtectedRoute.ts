import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "@/context/AuthContext";

/**
 * Hook que redireciona automaticamente entre auth e main
 * baseado no estado de autenticação.
 *
 * Uso: chamar no _layout.tsx raiz.
 */
export function useProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // Usuário não autenticado → redirecionar para auth
      router.replace("/(auth)/onboarding");
    } else if (isAuthenticated && inAuthGroup) {
      // Usuário autenticado → redirecionar para main
      router.replace("/(main)");
    }
  }, [isAuthenticated, isLoading, segments]);
}
