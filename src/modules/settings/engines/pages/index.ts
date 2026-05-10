import { lazy } from "react";

export const EnginesListPage = lazy(
  () => import("@/modules/settings/engines/pages/engines-list-page"),
);