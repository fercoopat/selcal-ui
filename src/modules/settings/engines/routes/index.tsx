import type { RouteObject } from "react-router";

import { ENGINES_PATHS } from "@/modules/settings/engines/constants/engines.paths";
import { EnginesListPage } from "@/modules/settings/engines/pages";

export const ENGINES_ROUTES: RouteObject[] = [
  {
    path: ENGINES_PATHS.LIST,
    children: [
      {
        path: ENGINES_PATHS.LIST,
        Component: EnginesListPage,
      },
    ],
  },
];