const BASE_PATH = "/users";

export const SECURITY_USERS_BASE_PATH = `/security${BASE_PATH}`;

export const USER_LIST_TAB = {
  ALL: "all",
  ACTIVES: "actives",
  INACTIVE: "inactive",
} as const;

export type UserListTab = (typeof USER_LIST_TAB)[keyof typeof USER_LIST_TAB];

export const USER_DETAILS_TAB = {
  GENERAL: "general",
  SECURITY: "security",
} as const;

export type UserDetailsTab =
  (typeof USER_DETAILS_TAB)[keyof typeof USER_DETAILS_TAB];

export const USERS_PATHS = {
  BASE_PATH: SECURITY_USERS_BASE_PATH,

  listTabPath: (tab: UserListTab = USER_LIST_TAB.ALL) =>
    `${SECURITY_USERS_BASE_PATH}/${tab}`,

  detailsPath: (userId: string | undefined, tab?: UserDetailsTab) => {
    if (!userId) return "#";

    const end = !tab ? "" : `/${tab}`;

    return `${SECURITY_USERS_BASE_PATH}/details/${userId}${end}`;
  },
} as const;
