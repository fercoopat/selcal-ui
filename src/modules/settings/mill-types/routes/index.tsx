import type { RouteObject } from "react-router";

import { MILL_TYPES_PATHS } from '@/modules/settings/mill-types/constants/mill-types.paths';
import { MillTypesListPage } from '@/modules/settings/mill-types/pages';

export const MILL_TYPES_ROUTES: RouteObject[] = [
  {
    path: MILL_TYPES_PATHS.LIST,
    children: [
      {
        index: true,
        Component: MillTypesListPage,
      },
    ],
  },
];
