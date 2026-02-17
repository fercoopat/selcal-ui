import type { RouteObject } from "react-router";

import { PROJECTS_PATHS } from "@/modules/projects/constants/projects-paths";
import { ProjectDetailsPage, ProjectsListPage } from "@/modules/projects/pages";

export const projectsRoutes: RouteObject[] = [
  {
    path: PROJECTS_PATHS.basePath,
    Component: ProjectsListPage,
  },

  {
    path: PROJECTS_PATHS.detailsPath(":id"),
    Component: ProjectDetailsPage,
  },
];
