import { lazy } from "react";
import type { RouteObject } from "react-router";

import { ModuleLayout } from "@/components/layouts";
import { SETTINGS_PATHS } from "@/modules/settings/constants/settings-paths";

const MillTypesPage = lazy(() =>
  import("@/modules/settings/pages/index").then((m) => ({
    default: m.MillTypesPage,
  })),
);
const ProfileTypesPage = lazy(() =>
  import("@/modules/settings/pages/index").then((m) => ({
    default: m.ProfileTypesPage,
  })),
);
const PassGeometryTypesPage = lazy(() =>
  import("@/modules/settings/pages/index").then((m) => ({
    default: m.PassGeometryTypesPage,
  })),
);

export const settingsRoutes: RouteObject[] = [
  {
    path: SETTINGS_PATHS.basePath,
    element: (
      <ModuleLayout
        path={SETTINGS_PATHS.basePath}
        notFoundRedirectTo={SETTINGS_PATHS.millTypesPath}
      />
    ),
    children: [
      { path: "mill-types", Component: MillTypesPage },
      { path: "profile-types", Component: ProfileTypesPage },
      { path: "pass-geometry-types", Component: PassGeometryTypesPage },
    ],
  },
];
