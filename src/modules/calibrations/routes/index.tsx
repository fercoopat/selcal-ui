import { lazy } from "react";
import type { RouteObject } from "react-router";

import { CALIBRATIONS_PATHS } from "@/modules/calibrations/constants/calibrations-paths";

const CalibrationsListPage = lazy(
  () => import("@/modules/calibrations/pages/calibrations-list-page"),
);
const CalibrationDetailPage = lazy(
  () => import("@/modules/calibrations/pages/calibration-detail-page"),
);

export const calibrationRoutes: RouteObject[] = [
  {
    path: CALIBRATIONS_PATHS.basePath,
    children: [
      { index: true, Component: CalibrationsListPage },
      { path: ":id", Component: CalibrationDetailPage },
    ],
  },
];
