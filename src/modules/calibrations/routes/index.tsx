import type { RouteObject } from "react-router";

import { CALIBRATIONS_PATHS } from "@/modules/calibrations/constants/calibrations-paths";
import { CalibrationDetailPage, CalibrationsListPage } from '@/modules/calibrations/pages';


export const calibrationRoutes: RouteObject[] = [
  {
    path: CALIBRATIONS_PATHS.LIST,
    children: [
      { index: true, Component: CalibrationsListPage },
      { path: ":id", Component: CalibrationDetailPage },
    ],
  },
];
