import { lazy } from 'react';

export const MaterialGradesListPage = lazy(
  () => import("@/modules/settings/material-grades/pages/material-grades-list-page"),
);