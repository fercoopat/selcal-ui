import { Suspense } from "react";
import type { RouteObject } from "react-router";

import { MainLayout } from "@/components/layouts";
import { PageLoader } from "@/components/loaders";
import { DASHBOARD_ROUTES } from "@/modules/dashboard/routes";
import { OPERATIONS_ROUTES } from "@/modules/operations/shared/routes";
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
      ...OPERATIONS_ROUTES,
      ...SECURITY_ROUTES,
      ...SETTINGS_ROUTES,
    ],
  },
];
