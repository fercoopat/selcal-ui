import { lazy } from "react";

export const MaterialsListPage = lazy(
  () => import("@/modules/settings/materials/pages/materials-list-page"),
);
