import type { RouteObject } from "react-router";

import { ISSUES_PATHS } from "@/modules/issues/constants/issues-paths";
import { IssueDetailsPage, IssuesListPage } from "@/modules/issues/pages";

export const issuesRoutes: RouteObject[] = [
  {
    path: ISSUES_PATHS.basePath,
    children: [
      {
        path: ISSUES_PATHS.basePath,
        Component: IssuesListPage,
      },

      {
        path: ISSUES_PATHS.detailsPath(":id"),
        Component: IssueDetailsPage,
      },
    ],
  },
];
