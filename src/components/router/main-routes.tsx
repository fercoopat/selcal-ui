import { Suspense } from "react";
import type { RouteObject } from "react-router";

import { MainLayout } from "@/components/layouts";
import { PageLoader } from "@/components/loaders";
import { CALIBRATION_ROUTES } from "@/modules/calibrations/routes";
import { CHEMICAL_ELEMENTS_ROUTES } from "@/modules/chemical-elements/routes";
import { DASHBOARD_ROUTES } from "@/modules/dashboard/routes";
import { PASSES_ROUTES } from "@/modules/passes/routes";
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
      ...DASHBOARD_ROUTES,
      ...CALIBRATION_ROUTES,
      ...ROLLING_MILLS_ROUTES,
      ...CHEMICAL_ELEMENTS_ROUTES,
      ...SECURITY_ROUTES,
      ...SETTINGS_ROUTES,
      ...PASSES_ROUTES,
    ],
  },
];
