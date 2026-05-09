import type { RouteObject } from "react-router";

import { STANDS_PATHS } from "@/modules/settings/stands/constants/stands.paths";
import { StandsListPage } from "@/modules/settings/stands/pages";

export const STANDS_ROUTES: RouteObject[] = [
  {
    path: STANDS_PATHS.LIST,
    children: [
      {
        path: STANDS_PATHS.LIST,
        Component: StandsListPage,
      },
    ],
  },
];
