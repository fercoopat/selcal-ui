const BASE_PATH = "/calibrations";

export const OPERATIONS_CALIBRATIONS_BASE_PATH = `/operations${BASE_PATH}`;

export const CALIBRATIONS_PATHS = {
  LIST: OPERATIONS_CALIBRATIONS_BASE_PATH,
} as const;
