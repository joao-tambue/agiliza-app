export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export type UserRole = "CLIENT" | "LAVADEIRA";

export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING";

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthLoginResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthRegisterResponse {
  success: boolean;
  message: string;
}

export interface RegisterInput {
  name: string;
  phone: string;
  password: string;
  role?: UserRole;
}

export interface LoginInput {
  phone: string;
  password: string;
}

export interface ForgotPasswordInput {
  phone: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
}

export interface RefreshTokenInput {
  refreshToken: string;
}

export interface UpdateProfileInput {
  name?: string;
  phone?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface Lavadeira {
  id: string;
  fullName: string;
  bio?: string;
  profileImage?: string;
  province?: string;
  municipality?: string;
  neighborhood?: string;
  addressDetail?: string;
  isAvailable: boolean;
  ratingAvg: number;
  totalReviews: number;
  user: {
    phone: string;
    status: UserStatus;
  };
}

export type PlanType = "BASE" | "MEDIUM" | "PRO";

export interface Plan {
  plan: PlanType;
  label: string;
  price: number;
  durationMonths: number;
}

export interface Subscription {
  id: string;
  plan: PlanType;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
