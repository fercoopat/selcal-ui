import type { RouteObject } from "react-router";

import { CALIBRATIONS_PATHS } from "@/modules/operations/calibrations/constants/calibrations.paths";
import { CalibrationsListPage } from "@/modules/operations/calibrations/pages";

export const CALIBRATIONS_ROUTES: RouteObject[] = [
  {
    path: CALIBRATIONS_PATHS.LIST,
    children: [
      {
        path: CALIBRATIONS_PATHS.LIST,
        Component: CalibrationsListPage,
      },
    ],
  },
];
