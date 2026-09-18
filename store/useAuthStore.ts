import { create } from "zustand";
import { authApi } from "../api/auth";
import { tokenStorage } from "../api/client";
import type {
  RegisterInput,
  User,
} from "../api/types";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
}

export interface AuthActions {
  login: (phone: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<string>;
  logout: () => Promise<void>;
  forgotPassword: (phone: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyPhone: (token: string) => Promise<void>;
  initialize: () => Promise<void>;
  updateUser: (user: User) => void;
}

export type AuthStore = AuthState & AuthActions;

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    try {
      const token = await tokenStorage.getAccessToken();
      if (!token) {
        set({ isInitialized: true, isAuthenticated: false });
        return;
      }

      const user = await authApi.getMe();
      set({
        user,
        isAuthenticated: true,
        isInitialized: true,
      });
    } catch {
      await tokenStorage.clearTokens();
      set({ user: null, isAuthenticated: false, isInitialized: true });
    }
  },

  login: async (phone: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await authApi.login({ phone, password });

      if (!response.success || !response.data) {
        throw new Error(response.message || "Credenciais invalidas");
      }

      await tokenStorage.setTokens(
        response.data.accessToken,
        response.data.refreshToken,
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (input: RegisterInput) => {
    set({ isLoading: true });
    try {
      const response = await authApi.register(input);

      if (!response.success) {
        throw new Error(response.message || "Erro ao criar conta");
      }

      set({ isLoading: false });
      return response.message;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      const refreshToken = await tokenStorage.getRefreshToken();
      await authApi.logout(refreshToken || undefined);
    } catch {
      // Ignore logout API errors, clear locally regardless
    } finally {
      await tokenStorage.clearTokens();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  forgotPassword: async (phone: string) => {
    set({ isLoading: true });
    try {
      await authApi.forgotPassword({ phone });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  resetPassword: async (token: string, password: string) => {
    set({ isLoading: true });
    try {
      await authApi.resetPassword({ token, password });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  verifyPhone: async (token: string) => {
    set({ isLoading: true });
    try {
      await authApi.verifyPhone(token);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateUser: (user: User) => {
    set({ user });
  },
}));
