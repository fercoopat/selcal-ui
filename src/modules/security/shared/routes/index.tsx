import { type RouteObject } from "react-router";

import { ModuleLayout } from "@/components/layouts";
import { ROLES_ROUTES } from "@/modules/security/roles/routes";
import { SECURITY_PATHS } from "@/modules/security/shared/constants/security.paths";
import { USERS_ROUTES } from "@/modules/security/users/routes";

export const SECURITY_ROUTES: RouteObject[] = [
  {
    path: SECURITY_PATHS.BASE_PATH,
    element: (
      <ModuleLayout
        path={SECURITY_PATHS.BASE_PATH}
        notFoundRedirectTo={SECURITY_PATHS.USERS}
      />
    ),
    children: [...ROLES_ROUTES, ...USERS_ROUTES],
  },
];
