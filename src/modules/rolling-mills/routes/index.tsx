import { lazy } from "react";
import type { RouteObject } from "react-router";

import { ROLLING_MILLS_PATHS } from "@/modules/rolling-mills/constants/rolling-mills-paths";

const RollingMillsListPage = lazy(
  () => import("@/modules/rolling-mills/pages/rolling-mills-list-page"),
);

export const rollingMillsRoutes: RouteObject[] = [
  {
    path: ROLLING_MILLS_PATHS.basePath,
    children: [{ index: true, Component: RollingMillsListPage }],
  },
];
