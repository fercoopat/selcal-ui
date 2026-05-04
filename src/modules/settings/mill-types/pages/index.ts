import { lazy } from "react";

export const MillTypesListPage = lazy(
  () => import("@/modules/settings/mill-types/pages/mill-types-list-page"),
);
