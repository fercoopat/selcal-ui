import { type RouteObject } from "react-router";

import { ModuleLayout } from "@/components/layouts";
import { SETTINGS_PATHS } from '@/modules/settings/shared/constants/settings.paths';
import { BEARINGS_ROUTES } from "@/modules/settings/bearings/routes";
import { MATERIALS_ROUTES } from "@/modules/settings/materials/routes";

export const SETTINGS_ROUTES: RouteObject[] = [
  {
    path: SETTINGS_PATHS.BASE,
    element: (
      <ModuleLayout
        path={SETTINGS_PATHS.BASE}
        notFoundRedirectTo={SETTINGS_PATHS.MATERIALS}
      />
    ),
    children: [
      ...MATERIALS_ROUTES,
      ...BEARINGS_ROUTES,
      // ...MATERIAL_GRADES_ROUTES,
      // ...MILL_TYPES_ROUTES,
      // ...PASS_GEOMETRY_TYPES_ROUTES,
      // ...PROFILE_TYPES_ROUTES,
      // ...STANDS_ROUTES,
    ],
  },
];
