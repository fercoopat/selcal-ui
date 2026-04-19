import {
  FlaskConicalIcon,
  LayersIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  ShieldIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";

import { AUTH_PERMISSIONS } from "@/modules/auth/constants/auth.permissions";
import { useAuth } from "@/modules/auth/contexts/auth-context";
import { CALIBRATIONS_PERMISSIONS } from "@/modules/calibrations/constants";
import { CALIBRATIONS_PATHS } from "@/modules/calibrations/constants/calibrations.paths";
import { CHEMICAL_ELEMENTS_PERMISSIONS } from "@/modules/chemical-elements/constants";
import { CHEMICAL_ELEMENTS_PATHS } from "@/modules/chemical-elements/constants/chemical-elements.paths";
import { DASHBOARD_PATHS } from "@/modules/dashboard/constants/dashboard.paths";
import { MATERIAL_GRADES_PERMISSIONS } from "@/modules/material-grades/constants";
import { MATERIAL_GRADES_PATHS } from "@/modules/material-grades/constants/material-grades.paths";
import { ROLLING_MILLS_PERMISSIONS } from "@/modules/rolling-mills/constants";
import { ROLLING_MILLS_PATHS } from "@/modules/rolling-mills/constants/rolling-mills.paths";
import { SECURITY_PATHS } from "@/modules/security/shared/constants/security.paths";
import { MILL_TYPES_PERMISSIONS } from "@/modules/settings/mill-types/constants";
import { PASS_GEOMETRY_TYPES_PERMISSIONS } from "@/modules/settings/pass-geometry-types/constants";
import { PROFILE_TYPES_PERMISSIONS } from "@/modules/settings/profile-types/constants";
import { SETTINGS_PATHS } from "@/modules/settings/shared/constants/settings.paths";

type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  defaultOpen?: boolean;
  permissions?: string[];
  exact?: boolean;
  items?: Array<{
    title: string;
    url: string;
    permissions?: string[];
    exact?: boolean;
  }>;
};

type MenuSection = {
  title: string;
  items: Record<string, MenuItem>;
  atLeastOne?: boolean;
  permissions?: string[];
};

const MENU_SECTIONS: Record<string, MenuSection> = {
  general: {
    title: "menu:general.title",
    items: {
      dashboard: {
        icon: LayoutDashboardIcon,
        title: "menu:general.dashboard",
        url: DASHBOARD_PATHS.BASE_PATH,
        exact: true,
      },
      calibrations: {
        icon: LayersIcon,
        title: "menu:general.calibrations",
        url: CALIBRATIONS_PATHS.LIST,
        permissions: [CALIBRATIONS_PERMISSIONS.READ],
      },
      rollingMills: {
        icon: LayersIcon,
        title: "menu:general.rollingMills",
        url: ROLLING_MILLS_PATHS.BASE_PATH,
        permissions: [ROLLING_MILLS_PERMISSIONS.READ],
      },
      materialGrades: {
        icon: FlaskConicalIcon,
        title: "menu:general.materialGrades",
        url: MATERIAL_GRADES_PATHS.LIST,
        permissions: [MATERIAL_GRADES_PERMISSIONS.READ],
      },
      chemicalElements: {
        icon: FlaskConicalIcon,
        title: "menu:general.chemicalElements",
        url: CHEMICAL_ELEMENTS_PATHS.LIST,
        permissions: [CHEMICAL_ELEMENTS_PERMISSIONS.READ],
      },
    },
  },

  settings: {
    title: "menu:settings.title",
    permissions: [AUTH_PERMISSIONS.ADMIN],
    items: {
      millTypes: {
        icon: SettingsIcon,
        title: "menu:settings.millTypes",
        url: SETTINGS_PATHS.MILL_TYPES,
        permissions: [MILL_TYPES_PERMISSIONS.READ],
      },
      profileTypes: {
        icon: SettingsIcon,
        title: "menu:settings.profileTypes",
        url: SETTINGS_PATHS.PROFILE_TYPES,
        permissions: [PROFILE_TYPES_PERMISSIONS.READ],
      },
      passGeometryTypes: {
        icon: SettingsIcon,
        title: "menu:settings.passGeometryTypes",
        url: SETTINGS_PATHS.PASS_GEOMETRY_TYPES,
        permissions: [PASS_GEOMETRY_TYPES_PERMISSIONS.READ],
      },
    },
  },

  security: {
    title: "menu:security.title",
    permissions: [AUTH_PERMISSIONS.ADMIN],
    items: {
      roles: {
        icon: ShieldIcon,
        title: "menu:security.roles",
        url: SECURITY_PATHS.rolesPath,
      },
      users: {
        icon: UsersIcon,
        title: "menu:security.users",
        url: SECURITY_PATHS.usersPath,
      },
    },
  },
};

export const useMenu = () => {
  const { hasPermission } = useAuth();

  const sections = useMemo(() => {
    const filteredSections: Record<string, MenuSection> = {};

    Object.entries(MENU_SECTIONS).forEach(([sectionKey, section]) => {
      if (!hasPermission(section?.permissions)) return;

      const filteredItems: Record<string, MenuItem> = {};

      Object.entries(section.items).forEach(([itemKey, item]) => {
        if (!hasPermission(item?.permissions)) return;

        filteredItems[itemKey] = item;
      });

      if (Object.keys(filteredItems).length > 0) {
        filteredSections[sectionKey] = {
          ...section,
          items: filteredItems,
        };
      }
    });

    return filteredSections;
  }, [hasPermission]);

  return { sections };
};
