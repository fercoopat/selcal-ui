import type { RouteObject } from "react-router";

import { PROFILE_TYPES_PATHS } from "@/modules/settings/profile-types/constants/profile-types.paths";
import { ProfileTypesListPage } from "@/modules/settings/profile-types/pages";

export const PROFILE_TYPES_ROUTES: RouteObject[] = [
  {
    path: PROFILE_TYPES_PATHS.LIST,
    children: [{ index: true, Component: ProfileTypesListPage }],
  },
];
