import { BEARINGS_PATHS } from "@/modules/settings/bearings/constants";
import { MATERIALS_PATHS } from "@/modules/settings/materials/constants";
import { MILL_TYPES_PATHS } from "@/modules/settings/mill-types/constants";
import { ROLLING_MILLS_PATHS } from "@/modules/settings/rolling-mills/constants";
import { STANDS_PATHS } from "@/modules/settings/stands/constants";

const BASE_PATH = "/settings";

export const SETTINGS_PATHS = {
  BASE: BASE_PATH,
  MATERIALS: MATERIALS_PATHS.LIST,
  BEARINGS: BEARINGS_PATHS.LIST,
  MILL_TYPES: MILL_TYPES_PATHS.LIST,
  ROLLING_MILLS: ROLLING_MILLS_PATHS.LIST,
  STANDS: STANDS_PATHS.LIST,
} as const;
