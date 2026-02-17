import type { RouteObject } from "react-router";

import { USERS_PATHS } from "@/modules/security/users/constants/users-paths";
import { UserDetailsPage, UsersListPage } from "@/modules/security/users/pages";

export const usersRoutes: RouteObject[] = [
  {
    path: USERS_PATHS.basePath,
    // element: (
    //   <ModuleLayout
    //     path={USERS_PATHS.basePath}
    //     notFoundRedirectTo={USERS_PATHS.basePath}
    //   />
    // ),
    children: [
      {
        path: USERS_PATHS.basePath,
        Component: UsersListPage,
      },

      {
        path: USERS_PATHS.detailsPath(":id"),
        Component: UserDetailsPage,
      },
    ],
  },
];
