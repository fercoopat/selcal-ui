import { lazy } from 'react';

export const CalibrationsListPage = lazy(
  () => import("@/modules/calibrations/pages/calibrations-list-page"),
);

export const CalibrationDetailPage = lazy(
  () => import("@/modules/calibrations/pages/calibration-detail-page"),
);
