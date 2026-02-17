import { lazy } from "react";

export const RolesListPage = lazy(
  () => import("@/modules/security/roles/pages/roles-list-page"),
);
