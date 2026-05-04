import { type RouteObject } from "react-router";

import { ModuleLayout } from "@/components/layouts";
import { BEARINGS_ROUTES } from "@/modules/settings/bearings/routes";
import { MATERIALS_ROUTES } from "@/modules/settings/materials/routes";
import { MILL_TYPES_ROUTES } from "@/modules/settings/mill-types/routes";
import { SETTINGS_PATHS } from "@/modules/settings/shared/constants/settings.paths";

export const SETTINGS_ROUTES: RouteObject[] = [
  {
    path: SETTINGS_PATHS.BASE,
    element: (
      <ModuleLayout
        path={SETTINGS_PATHS.BASE}
        notFoundRedirectTo={SETTINGS_PATHS.MATERIALS}
      />
    ),
    children: [...MATERIALS_ROUTES, ...BEARINGS_ROUTES, ...MILL_TYPES_ROUTES],
  },
];
