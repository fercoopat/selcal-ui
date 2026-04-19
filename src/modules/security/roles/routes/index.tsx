import type { RouteObject } from "react-router";

import { ROLES_PATHS } from "@/modules/security/roles/constants/roles.paths";
import { RolesListPage } from "@/modules/security/roles/pages";

export const ROLES_ROUTES: RouteObject[] = [
  {
    path: ROLES_PATHS.LIST,
    children: [
      {
        path: ROLES_PATHS.LIST,
        Component: RolesListPage,
      },
    ],
  },
];
