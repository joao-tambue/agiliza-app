import { useEffect, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuthStore } from "../store/useAuthStore";

/**
 * Hook that redirects between auth and main based on auth state.
 * Also initializes the auth store on first mount.
 */
export function useProtectedRoute() {
  const { isAuthenticated, isInitialized, initialize } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    setIsLayoutReady(true);
  }, []);

  useEffect(() => {
    if (!isInitialized || !isLayoutReady) return;

    const inAuthGroup = segments[0] === "(auth)";

    // TODO: reativar protecao de rotas quando o auth estiver pronto
    // if (!isAuthenticated && !inAuthGroup) {
    //   router.replace("/(auth)/login");
    // } else if (isAuthenticated && inAuthGroup) {
    //   router.replace("/(main)");
    // }
  }, [isAuthenticated, isInitialized, segments, isLayoutReady, router]);
}
