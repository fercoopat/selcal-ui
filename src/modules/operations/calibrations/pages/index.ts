import { lazy } from "react";

export const CalibrationsListPage = lazy(
  () => import("@/modules/operations/calibrations/pages/calibrations-list-page"),
);
