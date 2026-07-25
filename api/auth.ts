import api from "./client";
import type {
  ApiResponse,
  AuthLoginResponse,
  AuthRegisterResponse,
  ForgotPasswordInput,
  LoginInput,
  RefreshTokenInput,
  RegisterInput,
  ResetPasswordInput,
  UpdateProfileInput,
  User,
} from "./types";

export const authApi = {
  async register(input: RegisterInput): Promise<AuthRegisterResponse> {
    const { data } = await api.post<ApiResponse<AuthRegisterResponse>>(
      "/api/auth/register",
      input,
    );
    return data.data;
  },

  async login(input: LoginInput): Promise<AuthLoginResponse> {
    const { data } = await api.post<ApiResponse<AuthLoginResponse>>(
      "/api/auth/login",
      input,
    );
    return data.data;
  },

  async logout(refreshToken?: string): Promise<void> {
    await api.post("/api/auth/logout", { refreshToken });
  },

  async refreshToken(
    input: RefreshTokenInput,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { data } = await api.post<
      ApiResponse<{ accessToken: string; refreshToken: string }>
    >("/api/auth/refresh-token", input);
    return data.data;
  },

  async verifyPhone(token: string): Promise<void> {
    await api.get("/api/auth/verify-phone", { params: { token } });
  },

  async forgotPassword(input: ForgotPasswordInput): Promise<void> {
    await api.post("/api/auth/forgot-password", input);
  },

  async resetPassword(input: ResetPasswordInput): Promise<void> {
    await api.post("/api/auth/reset-password", input);
  },

  async getMe(): Promise<User> {
    const { data } = await api.get<ApiResponse<User>>("/api/auth/get-me");
    return data.data;
  },

  async updateProfile(input: UpdateProfileInput): Promise<User> {
    const { data } = await api.put<ApiResponse<User>>(
      "/api/auth/update-profile",
      input,
    );
    return data.data;
  },
};
