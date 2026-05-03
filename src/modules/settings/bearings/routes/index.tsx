import type { RouteObject } from "react-router";

import { BEARINGS_PATHS } from "@/modules/settings/bearings/constants/bearings.paths";
import { BearingsListPage } from "@/modules/settings/bearings/pages";

export const BEARINGS_ROUTES: RouteObject[] = [
  {
    path: BEARINGS_PATHS.LIST,
    children: [
      {
        path: BEARINGS_PATHS.LIST,
        Component: BearingsListPage,
      },
    ],
  },
];
