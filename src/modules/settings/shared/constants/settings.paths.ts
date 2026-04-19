import { MILL_TYPES_PATHS } from '@/modules/settings/mill-types/constants/mill-types.paths';
import { PASS_GEOMETRY_TYPES_PATHS } from '@/modules/settings/pass-geometry-types/constants/pass-geometry-types.paths';

const BASE_PATH = "/settings";

export const SETTINGS_PATHS = {
  BASE: BASE_PATH,

  MILL_TYPES: MILL_TYPES_PATHS.LIST,

  PASS_GEOMETRY_TYPES: PASS_GEOMETRY_TYPES_PATHS.LIST,
} as const;
