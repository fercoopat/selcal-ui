import type { RouteObject } from "react-router";

import { ROLLING_MILLS_PATHS } from "@/modules/settings/rolling-mills/constants/rolling-mills.paths";
import { RollingMillsListPage } from "@/modules/settings/rolling-mills/pages";

export const ROLLING_MILLS_ROUTES: RouteObject[] = [
  {
    path: ROLLING_MILLS_PATHS.LIST,
    children: [
      {
        path: ROLLING_MILLS_PATHS.LIST,
        Component: RollingMillsListPage,
      },
    ],
  },
];
