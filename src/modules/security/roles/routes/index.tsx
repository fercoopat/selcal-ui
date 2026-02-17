import type { RouteObject } from "react-router";

import { ROLES_PATHS } from "@/modules/security/roles/constants/roles-paths";
import { RolesListPage } from "@/modules/security/roles/pages";

export const rolesRoutes: RouteObject[] = [
  {
    path: ROLES_PATHS.basePath,
    children: [
      {
        path: ROLES_PATHS.basePath,
        Component: RolesListPage,
      },
    ],
  },
];
