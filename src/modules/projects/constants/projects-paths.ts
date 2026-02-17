const BASE_PATH = "/projects";

export const PROJECT_LIST_TAB = {
  ALL: "all",
  ACTIVES: "actives",
  INACTIVE: "inactive",
} as const;

export type ProjectListTab =
  (typeof PROJECT_LIST_TAB)[keyof typeof PROJECT_LIST_TAB];

export const PROJECT_DETAILS_TAB = {
  GENERAL: "general",
  MEMBERS: "members",
  ISSUES: "issues",
} as const;

export type ProjectDetailsTab =
  (typeof PROJECT_DETAILS_TAB)[keyof typeof PROJECT_DETAILS_TAB];

export const PROJECTS_PATHS = {
  basePath: BASE_PATH,

  listTabPath: (tab: ProjectListTab = PROJECT_LIST_TAB.ALL) =>
    `${BASE_PATH}/${tab}`,

  detailsPath: (projectId: string | undefined, tab?: ProjectDetailsTab) => {
    if (!projectId) {
      return "#";
    }

    const end = !tab ? "" : `/${tab}`;

    return `${BASE_PATH}/${projectId}${end}`;
  },
} as const;
