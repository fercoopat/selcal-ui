import cookies from "js-cookie";

import { timeToMs } from "@/shared/utils/time.utils";

const isDevelopment = import.meta.env.DEV;

export interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

class Service {
  private readonly DEFAULT_OPTIONS: CookieOptions = {
    expires: timeToMs(7), // 7 days by default
    path: "/",
    secure: !isDevelopment, // Only HTTPS in production
    sameSite: "strict" as const,
  };

  // Get a cookie
  get<T = string>(key: string): T | null {
    try {
      const value = cookies.get(key);
      if (!value) return null;

      // Try parse if is JSON
      if (this.isJson(value)) {
        return JSON.parse(value) as T;
      }

      return value as T;
    } catch (error) {
      console.error(`Error getting cookie ${key}:`, error);
      return null;
    }
  }

  // Save a cookie
  set<T = string>(key: string, value: T, options?: CookieOptions): void {
    try {
      const stringValue =
        typeof value === "object" ? JSON.stringify(value) : String(value);

      const mergedOptions = { ...this.DEFAULT_OPTIONS, ...options };

      cookies.set(key, stringValue, mergedOptions);

      // Fire custom event to notify changes
      this.dispatchCookieChange(key, value, "set");
    } catch (error) {
      console.error(`Error setting cookie ${key}:`, error);
    }
  }

  // Delete a cookie
  remove(key: string, options?: Pick<CookieOptions, "path" | "domain">): void {
    try {
      cookies.remove(key, options);

      // Fire custom event
      this.dispatchCookieChange(key, null, "remove");
    } catch (error) {
      console.error(`Error removing cookie ${key}:`, error);
    }
  }

  // Verify if cookie exists
  exists(key: string): boolean {
    return cookies.get(key) !== undefined;
  }

  // Get all cookies
  getAll(): Record<string, string> {
    return cookies.get();
  }

  // Delete all cookies (only this app cookies)
  clearAll(appPrefix?: string): void {
    const allCookies = this.getAll();

    Object.keys(allCookies).forEach((key) => {
      // If prefix, only delete cookies that start with prefix
      if (!appPrefix || key.startsWith(appPrefix)) {
        this.remove(key);
      }
    });
  }

  // For JWT tokens specifically
  getAuthToken(): string | null {
    return this.get<string>("accessToken");
  }

  setAuthToken(token: string, rememberMe = false): void {
    this.set("accessToken", token, {
      expires: rememberMe ? 30 : 1, // 30 days if rememberMe, 1 day if not
      secure: !isDevelopment,
      sameSite: "strict",
    });
  }

  removeAuthToken(): void {
    this.remove("accessToken");
  }

  // For user data
  getUserData<T = unknown>(): T | null {
    return this.get<T>("userData");
  }

  setUserData<T>(userData: T): void {
    this.set("userData", userData);
  }

  removeUserData(): void {
    this.remove("userData");
  }

  // For user preferences
  getPreferences<T = unknown>(): T | null {
    return this.get<T>("userPreferences");
  }

  setPreferences<T>(preferences: T): void {
    this.set("userPreferences", preferences);
  }

  // Methods for private help
  private isJson(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }

  private dispatchCookieChange<T>(
    key: string,
    value: T | null,
    action: "set" | "remove",
  ): void {
    // Crete custom event for component hearing changes
    const event = new CustomEvent("cookieChange", {
      detail: { key, value, action, timestamp: new Date() },
    });

    window.dispatchEvent(event);
  }

  // Subscribe to cookies changes
  subscribe(callback: (event: CustomEvent) => void): () => void {
    const handler = (event: Event) => callback(event as CustomEvent);

    window.addEventListener("cookieChange", handler);

    // Return unsubscribe function
    return () => {
      window.removeEventListener("cookieChange", handler);
    };
  }
}

export const CookiesService = new Service();
