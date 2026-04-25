import type { RouteObject } from "react-router";

import { MATERIAL_GRADES_PATHS } from "@/modules/settings/material-grades/constants/material-grades.paths";
import { MaterialGradesListPage } from "@/modules/settings/material-grades/pages";

export const MATERIAL_GRADES_ROUTES: RouteObject[] = [
  {
    path: MATERIAL_GRADES_PATHS.LIST,
    children: [{ index: true, Component: MaterialGradesListPage }],
  },
];
