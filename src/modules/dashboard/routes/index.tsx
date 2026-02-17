import type { RouteObject } from "react-router";

import { DASHBOARD_PATHS } from "@/modules/dashboard/constants/dashboard-paths";
import { DashboardPage } from "@/modules/dashboard/pages";

export const dashboardRoutes: RouteObject[] = [
  {
    path: DASHBOARD_PATHS.basePath,
    Component: DashboardPage,
  },
];
