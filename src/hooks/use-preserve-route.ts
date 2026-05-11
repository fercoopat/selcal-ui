import { useEffect } from "react";
import { useLocation } from "react-router";

const REDIRECT_KEY = "auth_redirect_path";
const AUTH_PATHS = ["/auth/signin", "/auth/signup"] as const;

export const saveRedirectPath = (path: string) => {
  sessionStorage.setItem(REDIRECT_KEY, path);
};

export const getSavedRedirectPath = (): string | null => {
  return sessionStorage.getItem(REDIRECT_KEY);
};

export const clearSavedRedirectPath = (): void => {
  sessionStorage.removeItem(REDIRECT_KEY);
};

const isAuthPath = (pathname: string) => AUTH_PATHS.includes(pathname as (typeof AUTH_PATHS)[number]);

export const getSafeRedirectPath = (
  fallbackPath: string,
  currentPathname?: string,
): string => {
  const savedPath = getSavedRedirectPath();

  if (!savedPath) return fallbackPath;
  if (!savedPath.startsWith("/")) return fallbackPath;
  if (savedPath.startsWith("/auth")) return fallbackPath;
  if (currentPathname && savedPath === currentPathname) return fallbackPath;

  return savedPath;
};

export const usePreserveRoute = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!isAuthPath(pathname)) {
      saveRedirectPath(`${pathname}${search}${hash}`);
    }
  }, [pathname, search, hash]);
};
