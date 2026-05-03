import type { RouteObject } from "react-router";

import { MATERIALS_PATHS } from "@/modules/settings/materials/constants/materials.paths";
import { MaterialsListPage } from "@/modules/settings/materials/pages";

export const MATERIALS_ROUTES: RouteObject[] = [
  {
    path: MATERIALS_PATHS.LIST,
    children: [
      {
        path: MATERIALS_PATHS.LIST,
        Component: MaterialsListPage,
      },
    ],
  },
];
