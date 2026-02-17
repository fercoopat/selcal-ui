import { useCallback, useEffect, useState } from "react";

import { CookiesService, type CookieOptions } from "@/lib/cookies";
import type { User } from "@/modules/security/users/interfaces/user.interface";

export const useCookies = <T = unknown>(key: string, defaultValue?: T) => {
  const [value, setValue] = useState<T | null>(() => {
    const stored = CookiesService.get<T>(key);
    return stored !== null ? stored : defaultValue || null;
  });

  useEffect(() => {
    const unsubscribe = CookiesService.subscribe((event) => {
      if (event.detail.key === key) {
        setValue(event.detail.value);
      }
    });

    return unsubscribe;
  }, [key]);

  const setCookie = useCallback(
    (newValue: T, options?: CookieOptions) => {
      CookiesService.set(key, newValue, options);
    },
    [key],
  );

  const removeCookie = useCallback(() => {
    CookiesService.remove(key);
  }, [key]);

  return {
    value,
    setCookie,
    removeCookie,
    exists: CookiesService.exists(key),
  };
};

const clearAuth = () => {
  CookiesService.removeAuthToken();
  CookiesService.remove("refreshToken");
  CookiesService.removeUserData();
};

export const useAuthCookies = () => {
  const token = useCookies<string>("accessToken");
  const user = useCookies("userData");
  const refreshToken = useCookies<string>("refreshToken");

  const setAuth = useCallback(
    (payload: { accessToken: string; user?: User; rememberMe?: boolean }) => {
      CookiesService.setAuthToken(payload.accessToken, payload.rememberMe);

      // if (tokens.refreshToken) {
      //   CookiesService.set("refreshToken", tokens.refreshToken, {
      //     expires: 30,
      //     secure: true,
      //     sameSite: "strict",
      //   });
      // }

      if (payload.user) {
        CookiesService.setUserData(payload.user);
      }
    },
    [],
  );
  const isAuthenticated = useCallback(() => {
    return !!token.value;
  }, [token.value]);

  return {
    token: token.value,
    user: user.value,
    refreshToken: refreshToken.value,
    setAuth,
    clearAuth,
    isAuthenticated: isAuthenticated(),
    setToken: token.setCookie,
    setUser: user.setCookie,
  };
};
