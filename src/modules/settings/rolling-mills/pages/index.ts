import { lazy } from "react";

export const RollingMillsListPage = lazy(
  () => import("@/modules/settings/rolling-mills/pages/rolling-mills-list-page"),
);
