import { CALIBRATIONS_PATHS } from "@/modules/operations/calibrations/constants/calibrations.paths";

const BASE_PATH = "/operations";

export const OPERATIONS_PATHS = {
  BASE: BASE_PATH,
  CALIBRATIONS: CALIBRATIONS_PATHS.LIST,
} as const;
