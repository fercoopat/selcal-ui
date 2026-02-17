import type {
  AxiosError,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";

import { ENV_KEYS, getEnv } from "@/config/envs";

const isDevelopment = import.meta.env.DEV;

export const API_CONFIG: CreateAxiosDefaults = {
  // In development, we use the /api prefix (proxy)
  // In production, we use the full URL
  baseURL: isDevelopment ? "/api" : getEnv(ENV_KEYS.BACKEND_URL),

  // Common config
  timeout: 10000,
  withCredentials: true,

  // Default headers
  headers: {
    "Content-Type": "application/json",
  },
};

// backend url if you need them
export const getBackendUrl = () => getEnv(ENV_KEYS.BACKEND_URL);

export type RequestConfig = InternalAxiosRequestConfig;

export type ApiResponse<T> = AxiosResponse<T>;

export type ApiError = AxiosError;
