import type { RouteObject } from "react-router";

import { USERS_PATHS } from "@/modules/security/users/constants/users.paths";
import { UserDetailsPage, UsersListPage } from "@/modules/security/users/pages";

export const USERS_ROUTES: RouteObject[] = [
  {
    path: USERS_PATHS.LIST,
    children: [
      {
        path: USERS_PATHS.LIST,
        Component: UsersListPage,
      },

      {
        path: USERS_PATHS.DETAILS(":id"),
        Component: UserDetailsPage,
      },
    ],
  },
];
