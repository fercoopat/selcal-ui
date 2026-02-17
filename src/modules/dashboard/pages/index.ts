import { lazy } from "react";

export const DashboardPage = lazy(
  () => import("@/modules/dashboard/pages/dashboard-page"),
);
