import axios from "axios";

import { API_CONFIG, type ApiError, type RequestConfig } from "@/config/api";
import {
  addAuthHeader,
  clearAuthData,
  redirectToLogin,
  saveAuthTokens,
} from "@/modules/auth/helpers/auth.helpers";
import { CookiesService } from "@/lib/cookies";

export interface AuthTokens {
  accessToken: string;
  expiresIn?: number;
}

export const ApiClient = axios.create(API_CONFIG);

ApiClient.interceptors.request.use(
  (config) => {
    config = addAuthHeader(config);
    return config;
  },
  (error) => Promise.reject(error),
);

ApiClient.interceptors.response.use(
  (response) => {
    saveAuthTokens(response);
    return response;
  },

  async (error: ApiError) => {
    const originalRequest = error.config as RequestConfig & {
      _retry?: boolean;
    };

    const status = error.response?.status;

    // Token expired (401) — attempt refresh once
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = CookiesService.get<string>("refreshToken");

      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${API_CONFIG.baseURL}/auth/refresh`,
            { refreshToken },
            { withCredentials: true },
          );

          CookiesService.setAuthToken(data.accessToken);

          if (data.refreshToken) {
            CookiesService.set("refreshToken", data.refreshToken, {
              expires: 30,
            });
          }

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          }

          return ApiClient(originalRequest);
        } catch {
          clearAuthData();
          redirectToLogin();
          return Promise.reject(new Error("Session expired. Please login again."));
        }
      }

      clearAuthData();
      redirectToLogin();
      return Promise.reject(new Error("Session expired. Please login again."));
    }

    // Forbidden (403)
    if (status === 403) {
      window.dispatchEvent(new CustomEvent("auth:forbidden"));
      return Promise.reject(
        new Error("You don't have permission to access this resource."),
      );
    }

    // Server error (500+)
    if (status && status >= 500) {
      return Promise.reject(new Error("Server error. Please try again later."));
    }

    // Validation error (400)
    if (status === 400) {
      const message = (error.response?.data as { message?: string | string[] })
        ?.message;
      return Promise.reject({ status: 400, message });
    }

    // Conflict (409)
    if (status === 409) {
      return Promise.reject({ status: 409, message: "This record already exists." });
    }

    // Rate limit (429)
    if (status === 429) {
      return Promise.reject({ status: 429, message: "Too many requests, please wait." });
    }

    const errorMessage =
      (error.response?.data as Error)?.message ||
      error.message ||
      "Unknown error";

    return Promise.reject(new Error(errorMessage));
  },
);
