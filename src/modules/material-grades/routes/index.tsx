import { lazy } from "react";
import type { RouteObject } from "react-router";

import { MATERIAL_GRADES_PATHS } from "@/modules/material-grades/constants/material-grades-paths";

const MaterialGradesListPage = lazy(
  () => import("@/modules/material-grades/pages/material-grades-list-page"),
);

export const materialGradesRoutes: RouteObject[] = [
  {
    path: MATERIAL_GRADES_PATHS.basePath,
    children: [{ index: true, Component: MaterialGradesListPage }],
  },
];
