const BASE_PATH = "/bearings";

export const SETTINGS_BEARINGS_BASE_PATH = `/settings${BASE_PATH}`;

export const BEARINGS_PATHS = {
  LIST: SETTINGS_BEARINGS_BASE_PATH,
} as const;
