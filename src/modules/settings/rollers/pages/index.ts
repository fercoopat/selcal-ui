import { lazy } from "react";

export const RollersListPage = lazy(
  () => import("@/modules/settings/rollers/pages/rollers-list-page"),
);