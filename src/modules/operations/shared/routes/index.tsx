import type { RouteObject } from "react-router";

import { ModuleLayout } from "@/components/layouts";
import { CALIBRATIONS_ROUTES } from "@/modules/operations/calibrations/routes";
import { OPERATIONS_PATHS } from "@/modules/operations/shared/constants/operations.paths";

export const OPERATIONS_ROUTES: RouteObject[] = [
  {
    path: OPERATIONS_PATHS.BASE,
    element: (
      <ModuleLayout
        path={OPERATIONS_PATHS.BASE}
        notFoundRedirectTo={OPERATIONS_PATHS.CALIBRATIONS}
      />
    ),
    children: [...CALIBRATIONS_ROUTES],
  },
];
