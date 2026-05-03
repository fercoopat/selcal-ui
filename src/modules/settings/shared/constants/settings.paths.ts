import { MATERIALS_PATHS } from "@/modules/settings/materials/constants";

const BASE_PATH = "/settings";

export const SETTINGS_PATHS = {
  BASE: BASE_PATH,
  MATERIALS: MATERIALS_PATHS.LIST,
} as const;
