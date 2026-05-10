import { type RouteObject } from "react-router";

import { ModuleLayout } from "@/components/layouts";
import { BEARINGS_ROUTES } from "@/modules/settings/bearings/routes";
import { ENGINES_ROUTES } from "@/modules/settings/engines/routes";
import { MATERIALS_ROUTES } from "@/modules/settings/materials/routes";
import { MILL_TYPES_ROUTES } from "@/modules/settings/mill-types/routes";
import { ROLLERS_ROUTES } from "@/modules/settings/rollers/routes";
import { ROLLING_MILLS_ROUTES } from "@/modules/settings/rolling-mills/routes";
import { SETTINGS_PATHS } from "@/modules/settings/shared/constants/settings.paths";
import { STANDS_ROUTES } from "@/modules/settings/stands/routes";

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
      ...BEARINGS_ROUTES,
      ...ENGINES_ROUTES,
      ...MATERIALS_ROUTES,
      ...MILL_TYPES_ROUTES,
      ...ROLLERS_ROUTES,
      ...ROLLING_MILLS_ROUTES,
      ...STANDS_ROUTES,
    ],
  },
];
