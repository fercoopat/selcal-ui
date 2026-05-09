import { lazy } from "react";

export const StandsListPage = lazy(
  () => import("@/modules/settings/stands/pages/stands-list-page"),
);
