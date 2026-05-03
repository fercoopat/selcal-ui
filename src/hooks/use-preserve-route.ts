import { useEffect } from "react";
import { useLocation } from "react-router";

const REDIRECT_KEY = "auth_redirect_path";

export const saveRedirectPath = (path: string) => {
  sessionStorage.setItem(REDIRECT_KEY, path);
};

export const getSavedRedirectPath = (): string | null => {
  return sessionStorage.getItem(REDIRECT_KEY);
};

export const clearSavedRedirectPath = (): void => {
  sessionStorage.removeItem(REDIRECT_KEY);
};

export const usePreserveRoute = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const authPaths = ["/auth/signin", "/auth/signup"];
    if (!authPaths.includes(pathname)) {
      sessionStorage.setItem(REDIRECT_KEY, pathname);
    }
  }, [pathname]);
};
