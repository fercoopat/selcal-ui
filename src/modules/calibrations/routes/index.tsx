import { lazy } from "react";
import type { RouteObject } from "react-router";

const CalibrationWizardPage = lazy(
  () => import("@/modules/calibrations/pages/calibration-wizard-page"),
);

export const calibrationRoutes: RouteObject[] = [
  {
    path: "calibrations",
    children: [
      {
        index: true,
        element: <CalibrationWizardPage />,
      },
      {
        path: "wizard",
        element: <CalibrationWizardPage />,
      },
    ],
  },
];
