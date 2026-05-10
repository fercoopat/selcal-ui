import type { RouteObject } from "react-router";

import { ROLLERS_PATHS } from "@/modules/settings/rollers/constants/rollers.paths";
import { RollersListPage } from "@/modules/settings/rollers/pages";

export const ROLLERS_ROUTES: RouteObject[] = [
  {
    path: ROLLERS_PATHS.LIST,
    children: [
      {
        path: ROLLERS_PATHS.LIST,
        Component: RollersListPage,
      },
    ],
  },
];