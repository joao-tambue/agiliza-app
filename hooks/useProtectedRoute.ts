import { useEffect, useState } from "react";
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
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
  }, []);

  useEffect(() => {
    if (isLoading || !isLayoutReady) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/(main)");
    }
  }, [isAuthenticated, isLoading, segments, isLayoutReady, router]);
}
