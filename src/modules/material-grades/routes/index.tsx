import type { RouteObject } from "react-router";

import { MATERIAL_GRADES_PATHS } from "@/modules/material-grades/constants/material-grades.paths";
import { MaterialGradesListPage } from "@/modules/material-grades/pages";

export const materialGradesRoutes: RouteObject[] = [
  {
    path: MATERIAL_GRADES_PATHS.LIST,
    children: [{ index: true, Component: MaterialGradesListPage }],
  },
];
