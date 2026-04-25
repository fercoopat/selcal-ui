import { CALIBRATIONS_PERMISSIONS_VALUES } from "@/modules/calibrations/constants";
import { CHEMICAL_ELEMENTS_PERMISSIONS_VALUES } from "@/modules/chemical-elements/constants";
import { MATERIAL_GRADES_PERMISSIONS_VALUES } from "@/modules/settings/material-grades/constants";
import {
  FILES_PERMISSIONS_VALUES,
  MATERIAL_COMPOSITIONS_PERMISSIONS_VALUES,
} from "@/modules/materials/constants";
import { PASSES_PERMISSIONS_VALUES } from "@/modules/passes/constants";
import {
  ROLLING_MILLS_PERMISSIONS_VALUES,
  STANDS_PERMISSIONS_VALUES,
} from "@/modules/rolling-mills/constants";
import { ROLES_PERMISSIONS_VALUES } from "@/modules/security/roles/constants";
import { USERS_PERMISSIONS_VALUES } from "@/modules/security/users/constants/users.permissions";
import { MILL_TYPES_PERMISSIONS_VALUES } from "@/modules/settings/mill-types/constants";
import { PASS_GEOMETRY_TYPES_PERMISSIONS_VALUES } from "@/modules/settings/pass-geometry-types/constants";
import { PROFILE_TYPES_PERMISSIONS_VALUES } from "@/modules/settings/profile-types/constants";

export const PERMISSIONS_MAP = {
  roles: ROLES_PERMISSIONS_VALUES,
  users: USERS_PERMISSIONS_VALUES,
  calibrations: CALIBRATIONS_PERMISSIONS_VALUES,
  passes: PASSES_PERMISSIONS_VALUES,
  rollingMills: ROLLING_MILLS_PERMISSIONS_VALUES,
  stands: STANDS_PERMISSIONS_VALUES,
  materialGrades: MATERIAL_GRADES_PERMISSIONS_VALUES,
  chemicalElements: CHEMICAL_ELEMENTS_PERMISSIONS_VALUES,
  materialCompositions: MATERIAL_COMPOSITIONS_PERMISSIONS_VALUES,
  files: FILES_PERMISSIONS_VALUES,
  settings: [
    ...MILL_TYPES_PERMISSIONS_VALUES,
    ...PROFILE_TYPES_PERMISSIONS_VALUES,
    ...PASS_GEOMETRY_TYPES_PERMISSIONS_VALUES,
  ],
};
