import { type RouteObject } from "react-router";

import { ModuleLayout } from "@/components/layouts";
import { MATERIAL_GRADES_ROUTES } from '@/modules/settings/material-grades/routes';
import { MILL_TYPES_ROUTES } from '@/modules/settings/mill-types/routes';
import { PASS_GEOMETRY_TYPES_ROUTES } from '@/modules/settings/pass-geometry-types/routes';
import { SETTINGS_PATHS } from '@/modules/settings/shared/constants/settings.paths';

export const SETTINGS_ROUTES: RouteObject[] = [
  {
    path: SETTINGS_PATHS.BASE,
    element: (
      <ModuleLayout
        path={SETTINGS_PATHS.BASE}
        notFoundRedirectTo={SETTINGS_PATHS.MILL_TYPES}
      />
    ),
    children: [...MATERIAL_GRADES_ROUTES, ...MILL_TYPES_ROUTES, ...PASS_GEOMETRY_TYPES_ROUTES],
  },
];
