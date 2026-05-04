import { BEARINGS_PATHS } from "@/modules/settings/bearings/constants";
import { MATERIALS_PATHS } from "@/modules/settings/materials/constants";
import { MILL_TYPES_PATHS } from "@/modules/settings/mill-types/constants";

const BASE_PATH = "/settings";

export const SETTINGS_PATHS = {
  BASE: BASE_PATH,
  MATERIALS: MATERIALS_PATHS.LIST,
  BEARINGS: BEARINGS_PATHS.LIST,
  MILL_TYPES: MILL_TYPES_PATHS.LIST,
} as const;
