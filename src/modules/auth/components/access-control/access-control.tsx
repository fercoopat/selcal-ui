import { Navigate, Outlet, useLocation } from "react-router";

import { PageLoader } from "@/components/loaders";
import { AUTH_PATHS } from "@/modules/auth/constants/auth-paths";
import { useAuth } from "@/modules/auth/contexts/auth-context";
import { DASHBOARD_PATHS } from "@/modules/dashboard/constants/dashboard-paths";

const AUTH_ROUTES: string[] = [AUTH_PATHS.signinPath, AUTH_PATHS.signupPath];
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
      return <Navigate to={DASHBOARD_PATHS.basePath} replace />;
    }

    return <Outlet />;
  }

  if (isPublicRoute) {
    return <Outlet />;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return (
    <Navigate
      to={AUTH_PATHS.signinPath}
      replace
      state={{ redirect: pathname }}
    />
  );
};

export default AccessControl;
