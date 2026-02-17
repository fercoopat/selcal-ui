import { type RouteObject } from "react-router";

import { ModuleLayout } from "@/components/layouts";
import { rolesRoutes } from "@/modules/security/roles/routes";
import { SECURITY_PATHS } from "@/modules/security/shared/constants/security-paths";
import { usersRoutes } from "@/modules/security/users/routes";

export const securityRoutes: RouteObject[] = [
  {
    path: SECURITY_PATHS.basePath,
    element: (
      <ModuleLayout
        path={SECURITY_PATHS.basePath}
        notFoundRedirectTo={SECURITY_PATHS.usersPath}
      />
    ),
    children: [...rolesRoutes, ...usersRoutes],
  },
];
