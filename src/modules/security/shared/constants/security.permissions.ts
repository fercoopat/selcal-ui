import { CALIBRATIONS_PERMISSIONS_VALUES } from '@/modules/calibrations/constants';
import { CHEMICAL_ELEMENTS_PERMISSIONS_VALUES } from '@/modules/chemical-elements/constants';
import { USERS_PERMISSIONS } from "@/modules/security/users/constants/users.permissions";

export const PERMISSIONS_MAP = {
  // roles: ROLES_PERMISSIONS_VALUES,
  users: [USERS_PERMISSIONS.READ],
  calibrations: CALIBRATIONS_PERMISSIONS_VALUES,
  chemicalElements: CHEMICAL_ELEMENTS_PERMISSIONS_VALUES,
};
