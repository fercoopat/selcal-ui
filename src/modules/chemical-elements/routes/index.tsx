import { lazy } from "react";
import type { RouteObject } from "react-router";

import { CHEMICAL_ELEMENTS_PATHS } from "@/modules/chemical-elements/constants/chemical-elements-paths";

const ChemicalElementsListPage = lazy(
  () =>
    import(
      "@/modules/chemical-elements/pages/chemical-elements-list-page"
    ),
);

export const chemicalElementsRoutes: RouteObject[] = [
  {
    path: CHEMICAL_ELEMENTS_PATHS.basePath,
    children: [{ index: true, Component: ChemicalElementsListPage }],
  },
];
