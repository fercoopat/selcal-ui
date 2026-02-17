const BASE_PATH = "/issues";

export const ISSUE_LIST_TAB = {
  ALL: "all",
  ACTIVES: "actives",
  INACTIVE: "inactive",
} as const;

export type IssueListTab = (typeof ISSUE_LIST_TAB)[keyof typeof ISSUE_LIST_TAB];

export const ISSUE_DETAILS_TAB = {
  GENERAL: "general",
  MEMBERS: "members",
  ISSUES: "issues",
} as const;

export type IssueDetailsTab =
  (typeof ISSUE_DETAILS_TAB)[keyof typeof ISSUE_DETAILS_TAB];

export const ISSUES_PATHS = {
  basePath: BASE_PATH,

  listTabPath: (tab: IssueListTab = ISSUE_LIST_TAB.ALL) =>
    `${BASE_PATH}/${tab}`,

  detailsPath: (issueId: string | undefined, tab?: IssueDetailsTab) => {
    if (!issueId) {
      return "#";
    }

    const end = !tab ? "" : `/${tab}`;

    return `${BASE_PATH}/${issueId}${end}`;
  },
} as const;
