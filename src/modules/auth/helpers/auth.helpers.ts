import { type ApiResponse, type RequestConfig } from "@/config/api";
import { CookiesService } from "@/lib/cookies";
import { AUTH_PATHS } from "@/modules/auth/constants/auth.paths";
import type { AuthLoginResponse } from "@/modules/auth/interfaces/login.interface";

export const addAuthHeader = (config: RequestConfig) => {
  const token = CookiesService.getAuthToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const saveAuthTokens = (response: ApiResponse<AuthLoginResponse>) => {
  const { accessToken, refreshToken, user } = response.data || {};

  if (accessToken) {
    CookiesService.setAuthToken(accessToken);
  }

  if (refreshToken) {
    CookiesService.set("refreshToken", refreshToken, { expires: 30 });
  }

  if (user) {
    CookiesService.setUserData(user);
  }

  return response;
};

export const clearAuthData = () => {
  CookiesService.removeAuthToken();
  CookiesService.remove("refreshToken");
  CookiesService.removeUserData();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:expired"));
  }
};

export const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    window.location.href = AUTH_PATHS.SIGNIN;
  }
};
