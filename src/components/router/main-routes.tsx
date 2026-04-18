import { Suspense } from "react";
import type { RouteObject } from "react-router";

import { MainLayout } from "@/components/layouts";
import { PageLoader } from "@/components/loaders";
import { calibrationRoutes } from "@/modules/calibrations/routes";
import { chemicalElementsRoutes } from "@/modules/chemical-elements/routes";
import { dashboardRoutes } from "@/modules/dashboard/routes";
import { materialGradesRoutes } from "@/modules/material-grades/routes";
import { rollingMillsRoutes } from "@/modules/rolling-mills/routes";
import { securityRoutes } from "@/modules/security/shared/routes";
import { settingsRoutes } from "@/modules/settings/routes";

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
      ...rollingMillsRoutes,
      ...materialGradesRoutes,
      ...chemicalElementsRoutes,
      ...securityRoutes,
      ...settingsRoutes,
    ],
  },
];
