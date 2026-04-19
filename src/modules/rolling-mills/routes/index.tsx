import type { RouteObject } from "react-router";


import { ROLLING_MILLS_PATHS } from "@/modules/rolling-mills/constants/rolling-mills-paths";
import { RollingMillsListPage } from '@/modules/rolling-mills/pages';


export const ROLLING_MILLS_ROUTES: RouteObject[] = [
  {
    path: ROLLING_MILLS_PATHS.BASE_PATH,
    children: [{ index: true, Component: RollingMillsListPage }],
  },
];
