const BASE_PATH = "/profile-types";

export const SETTINGS_PROFILE_TYPES_BASE_PATH = `/settings${BASE_PATH}`;

export const PROFILE_TYPES_PATHS = {
  LIST: SETTINGS_PROFILE_TYPES_BASE_PATH,
} as const;
