import { Suspense } from "react";
import type { RouteObject } from "react-router";

import { MainLayout } from "@/components/layouts";
import { PageLoader } from "@/components/loaders";
import { calibrationRoutes } from "@/modules/calibrations/routes";
import { chemicalElementsRoutes } from "@/modules/chemical-elements/routes";
import { dashboardRoutes } from "@/modules/dashboard/routes";
import { materialGradesRoutes } from "@/modules/material-grades/routes";
import { ROLLING_MILLS_ROUTES } from "@/modules/rolling-mills/routes";
import { SECURITY_ROUTES } from "@/modules/security/shared/routes";
import { SETTINGS_ROUTES } from "@/modules/settings/shared/routes";

export const mainRoutes: RouteObject[] = [
  {
    element: (
      <Suspense fallback={<PageLoader size="screen" />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      ...dashboardRoutes,
      ...calibrationRoutes,
      ...ROLLING_MILLS_ROUTES,
      ...materialGradesRoutes,
      ...chemicalElementsRoutes,
      ...SECURITY_ROUTES,
      ...SETTINGS_ROUTES,
    ],
  },
];
