import { Navigate, Outlet, useLocation } from "react-router";

import { PageLoader } from "@/components/loaders";
import { AUTH_PATHS } from "@/modules/auth/constants/auth.paths";
import { useAuth } from "@/modules/auth/contexts/auth-context";
import { DASHBOARD_PATHS } from "@/modules/dashboard/constants/dashboard.paths";
import {
  clearSavedRedirectPath,
  getSafeRedirectPath,
  saveRedirectPath,
} from "@/hooks/use-preserve-route";

const AUTH_ROUTES: string[] = [AUTH_PATHS.SIGNIN, AUTH_PATHS.SIGNUP];
const PUBLIC_ROUTES: string[] = [];

const AccessControl = () => {
  const { pathname } = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader size="screen" />;
  }

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isAuthRoute) {
    if (isAuthenticated) {
      const redirectPath = getSafeRedirectPath(
        DASHBOARD_PATHS.BASE_PATH,
        pathname,
      );

      if (redirectPath !== DASHBOARD_PATHS.BASE_PATH) {
        clearSavedRedirectPath();
      }

      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  }

  if (isPublicRoute) {
    return <Outlet />;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  saveRedirectPath(pathname);
  return (
    <Navigate
      to={AUTH_PATHS.SIGNIN}
      replace
    />
  );
};

export default AccessControl;
