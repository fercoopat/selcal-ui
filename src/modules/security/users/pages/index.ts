import { lazy } from "react";

export const UsersListPage = lazy(
  () => import("@/modules/security/users/pages/users-list-page"),
);

export const UserDetailsPage = lazy(
  () => import("@/modules/security/users/pages/user-details-page"),
);
