import type { RouteObject } from "react-router";

import { CHEMICAL_ELEMENTS_PATHS } from "@/modules/chemical-elements/constants/chemical-elements.paths";
import { ChemicalElementsListPage } from "@/modules/chemical-elements/pages";

export const CHEMICAL_ELEMENTS_ROUTES: RouteObject[] = [
  {
    path: CHEMICAL_ELEMENTS_PATHS.LIST,
    children: [{ index: true, Component: ChemicalElementsListPage }],
  },
];
