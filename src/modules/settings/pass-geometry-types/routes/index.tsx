import type { RouteObject } from "react-router";

import { PASS_GEOMETRY_TYPES_PATHS } from '@/modules/settings/pass-geometry-types/constants/pass-geometry-types.paths';
import { PassGeometryTypesListPage } from '@/modules/settings/pass-geometry-types/pages';

export const PASS_GEOMETRY_TYPES_ROUTES: RouteObject[] = [
  {
    path: PASS_GEOMETRY_TYPES_PATHS.LIST,
    children: [
      {
        index: true,
        Component: PassGeometryTypesListPage,
      },
    ],
  },
];
