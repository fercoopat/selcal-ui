import type { RouteObject } from "react-router";

import { PASSES_PATHS } from "@/modules/passes/constants";
import { PassesListPage } from "@/modules/passes/pages";

export const PASSES_ROUTES: RouteObject[] = [
  {
    path: PASSES_PATHS.BASE_PATH,
    children: [{ index: true, Component: PassesListPage }],
  },
];
