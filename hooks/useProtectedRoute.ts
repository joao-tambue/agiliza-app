import { useEffect } from "react";
import { useRouter, useSegments, useRootNavigationState } from "expo-router";
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
  const rootState = useRootNavigationState();

  useEffect(() => {
    if (isLoading || !rootState) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(main)");
    }
  }, [isAuthenticated, isLoading, segments, rootState]);
}
