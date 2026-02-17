import { lazy } from "react";

export const ProjectsListPage = lazy(
  () => import("@/modules/projects/pages/projects-list-page"),
);

export const ProjectDetailsPage = lazy(
  () => import("@/modules/projects/pages/project-details-page"),
);
