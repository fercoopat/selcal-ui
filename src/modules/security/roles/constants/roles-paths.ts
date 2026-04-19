const BASE_PATH = "/roles";

export const SECURITY_ROLES_BASE_PATH = `/security${BASE_PATH}`;

export const ROLE_LIST_TAB = {
  ALL: "all",
  ACTIVES: "actives",
  INACTIVE: "inactive",
} as const;

export type RoleListTab = (typeof ROLE_LIST_TAB)[keyof typeof ROLE_LIST_TAB];

export const ROLES_PATHS = {
  LIST: SECURITY_ROLES_BASE_PATH,

  LIST_TAB: (tab: RoleListTab = ROLE_LIST_TAB.ALL) =>
    `${SECURITY_ROLES_BASE_PATH}/${tab}`,
} as const;
