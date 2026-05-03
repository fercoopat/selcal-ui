import { lazy } from "react";

export const BearingsListPage = lazy(
  () => import("@/modules/settings/bearings/pages/bearings-list-page"),
);
