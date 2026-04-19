import type { RouteObject } from "react-router";

import { USERS_PATHS } from "@/modules/security/users/constants/users-paths";
import { UserDetailsPage, UsersListPage } from "@/modules/security/users/pages";

export const USERS_ROUTES: RouteObject[] = [
  {
    path: USERS_PATHS.BASE_PATH,
    children: [
      {
        path: USERS_PATHS.BASE_PATH,
        Component: UsersListPage,
      },

      {
        path: USERS_PATHS.detailsPath(":id"),
        Component: UserDetailsPage,
      },
    ],
  },
];
