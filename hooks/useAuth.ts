import { useCallback, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import type { RegisterInput } from "../api/types";

// ─── useAuth ──────────────────────────────────────────────────────────────────

export function useAuth() {
  const store = useAuthStore();
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    isInitialized: store.isInitialized,
    login: store.login,
    register: store.register,
    logout: store.logout,
    forgotPassword: store.forgotPassword,
    resetPassword: store.resetPassword,
    verifyPhone: store.verifyPhone,
    updateUser: store.updateUser,
  };
}

// ─── useLogin ─────────────────────────────────────────────────────────────────

export function useLogin() {
  const { login, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(
    async (phone: string, password: string) => {
      setError(null);
      try {
        await login(phone, password);
      } catch (err: unknown) {
        const message = getErrorMessage(err);
        setError(message);
        throw err;
      }
    },
    [login],
  );

  return { handleLogin, isLoading, error, setError };
}

// ─── useRegister ──────────────────────────────────────────────────────────────

export function useRegister() {
  const { register, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRegister = useCallback(
    async (input: RegisterInput) => {
      setError(null);
      setSuccessMessage(null);
      try {
        const message = await register(input);
        setSuccessMessage(message);
      } catch (err: unknown) {
        const message = getErrorMessage(err);
        setError(message);
        throw err;
      }
    },
    [register],
  );

  return { handleRegister, isLoading, error, setError, successMessage };
}

// ─── useForgotPassword ────────────────────────────────────────────────────────

export function useForgotPassword() {
  const { forgotPassword, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = useCallback(
    async (phone: string) => {
      setError(null);
      setSuccess(false);
      try {
        await forgotPassword(phone);
        setSuccess(true);
      } catch (err: unknown) {
        const message = getErrorMessage(err);
        setError(message);
        throw err;
      }
    },
    [forgotPassword],
  );

  return { handleForgotPassword, isLoading, error, setError, success };
}

// ─── useResetPassword ─────────────────────────────────────────────────────────

export function useResetPassword() {
  const { resetPassword, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = useCallback(
    async (token: string, password: string) => {
      setError(null);
      setSuccess(false);
      try {
        await resetPassword(token, password);
        setSuccess(true);
      } catch (err: unknown) {
        const message = getErrorMessage(err);
        setError(message);
        throw err;
      }
    },
    [resetPassword],
  );

  return { handleResetPassword, isLoading, error, setError, success };
}

// ─── useVerifyPhone ───────────────────────────────────────────────────────────

export function useVerifyPhone() {
  const { verifyPhone, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleVerifyPhone = useCallback(
    async (token: string) => {
      setError(null);
      setSuccess(false);
      try {
        await verifyPhone(token);
        setSuccess(true);
      } catch (err: unknown) {
        const message = getErrorMessage(err);
        setError(message);
        throw err;
      }
    },
    [verifyPhone],
  );

  return { handleVerifyPhone, isLoading, error, setError, success };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const axiosErr = err as { response?: { data?: { message?: string } } };
    if (axiosErr.response?.data?.message) {
      return axiosErr.response.data.message;
    }
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "Ocorreu um erro inesperado. Tente novamente.";
}
