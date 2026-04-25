import { MATERIAL_GRADES_PATHS } from "@/modules/settings/material-grades/constants";
import { MILL_TYPES_PATHS } from "@/modules/settings/mill-types/constants/mill-types.paths";
import { PASS_GEOMETRY_TYPES_PATHS } from "@/modules/settings/pass-geometry-types/constants/pass-geometry-types.paths";
import { PROFILE_TYPES_PATHS } from "@/modules/settings/profile-types/constants/profile-types.paths";

const BASE_PATH = "/settings";

export const SETTINGS_PATHS = {
  BASE: BASE_PATH,

  MATERIAL_GRADES: MATERIAL_GRADES_PATHS.LIST,

  MILL_TYPES: MILL_TYPES_PATHS.LIST,

  PASS_GEOMETRY_TYPES: PASS_GEOMETRY_TYPES_PATHS.LIST,

  PROFILE_TYPES: PROFILE_TYPES_PATHS.LIST,
} as const;
