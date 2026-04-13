import { Suspense } from "react";
import type { RouteObject } from "react-router";

import { MainLayout } from "@/components/layouts";
import { PageLoader } from "@/components/loaders";
import { calibrationRoutes } from "@/modules/calibrations/routes/index.tsx";
import { dashboardRoutes } from "@/modules/dashboard/routes";
import { issuesRoutes } from "@/modules/issues/routes";
import { projectsRoutes } from "@/modules/projects/routes";
import { securityRoutes } from "@/modules/security/shared/routes";

export const mainRoutes: RouteObject[] = [
  {
    element: (
      <Suspense fallback={<PageLoader size="screen" />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      ...dashboardRoutes,
      ...issuesRoutes,
      ...projectsRoutes,
      ...securityRoutes,
      ...calibrationRoutes,
    ],
  },
];
