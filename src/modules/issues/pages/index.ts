import { lazy } from "react";

export const IssuesListPage = lazy(
  () => import("@/modules/issues/pages/issues-list-page"),
);

export const IssueDetailsPage = lazy(
  () => import("@/modules/issues/pages/issue-details-page"),
);
