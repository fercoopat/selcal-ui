import axios from "axios";

import { API_CONFIG, type ApiError, type RequestConfig } from "@/config/api";
import {
  addAuthHeader,
  clearAuthData,
  redirectToLogin,
  saveAuthTokens,
} from "@/modules/auth/helpers/auth.helpers";

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

  (error) => {
    return Promise.reject(error);
  },
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

    // Token expirado (401)
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // todo: refresh token handle
        // const newToken = await handleTokenRefresh();
        // originalRequest.headers.Authorization = `Bearer ${newToken}`;
        // return ApiClient(originalRequest);
      } catch {
        clearAuthData();

        redirectToLogin();

        return Promise.reject(
          new Error("Session expired. Please login again."),
        );
      }
    }

    // Acceso prohibido (403)
    if (status === 403) {
      window.dispatchEvent(new CustomEvent("auth:forbidden"));

      return Promise.reject(
        new Error("You don't have permission to access this resource."),
      );
    }

    // Error del servidor (500+)
    if (status && status >= 500) {
      return Promise.reject(new Error("Server error. Please try again later."));
    }

    // Error de validación (422)
    if (status === 422) {
      const validationErrors = (error.response?.data as { errors?: ApiError[] })
        ?.errors;

      if (validationErrors) {
        return Promise.reject({
          message: "Validation failed",
          errors: validationErrors,
        });
      }
    }

    // Error genérico
    const errorMessage =
      (error.response?.data as Error)?.message ||
      error.message ||
      "Unknown error";

    return Promise.reject(new Error(errorMessage));
  },
);
