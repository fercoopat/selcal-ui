import { MATERIALS_PATHS } from "@/modules/settings/materials/constants";
import { BEARINGS_PATHS } from "@/modules/settings/bearings/constants";

const BASE_PATH = "/settings";

export const SETTINGS_PATHS = {
  BASE: BASE_PATH,
  MATERIALS: MATERIALS_PATHS.LIST,
  BEARINGS: BEARINGS_PATHS.LIST,
} as const;
