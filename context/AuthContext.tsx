import React, { createContext, useContext, useState, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "client" | "lavadeira";
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

export interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

export interface SignUpData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "client" | "lavadeira";
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: false,
    user: null,
  });

  const signIn = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    // TODO: Implementar chamada real de API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setState({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: "1",
        name: "Utilizador",
        email,
        role: "client",
      },
    });
  }, []);

  const signUp = useCallback(async (data: SignUpData) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    // TODO: Implementar chamada real de API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setState({
      isAuthenticated: true,
      isLoading: false,
      user: {
        id: "1",
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
      },
    });
  }, []);

  const signOut = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await new Promise((resolve) => setTimeout(resolve, 500));
    setState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
    });
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    // TODO: Implementar chamada real de API
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
