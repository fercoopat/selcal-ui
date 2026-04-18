import {
  FlaskConicalIcon,
  LayoutDashboardIcon,
  LayersIcon,
  SettingsIcon,
  ShieldIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";

import { AUTH_PERMISSIONS } from "@/modules/auth/constants/auth-permissions";
import { useAuth } from "@/modules/auth/contexts/auth-context";
import { CALIBRATIONS_PATHS } from "@/modules/calibrations/constants/calibrations-paths";
import { CHEMICAL_ELEMENTS_PATHS } from "@/modules/chemical-elements/constants/chemical-elements-paths";
import { DASHBOARD_PATHS } from "@/modules/dashboard/constants/dashboard-paths";
import { MATERIAL_GRADES_PATHS } from "@/modules/material-grades/constants/material-grades-paths";
import { ROLLING_MILLS_PATHS } from "@/modules/rolling-mills/constants/rolling-mills-paths";
import { SECURITY_PATHS } from "@/modules/security/shared/constants/security-paths";
import { SETTINGS_PATHS } from "@/modules/settings/constants/settings-paths";

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
        url: DASHBOARD_PATHS.basePath,
        exact: true,
      },
      calibrations: {
        icon: LayersIcon,
        title: "menu:general.calibrations",
        url: CALIBRATIONS_PATHS.basePath,
        permissions: [AUTH_PERMISSIONS.CALIBRATIONS_READ],
      },
      rollingMills: {
        icon: LayersIcon,
        title: "menu:general.rollingMills",
        url: ROLLING_MILLS_PATHS.basePath,
        permissions: [AUTH_PERMISSIONS.ROLLING_MILLS_READ],
      },
      materialGrades: {
        icon: FlaskConicalIcon,
        title: "menu:general.materialGrades",
        url: MATERIAL_GRADES_PATHS.basePath,
        permissions: [AUTH_PERMISSIONS.MATERIAL_GRADES_READ],
      },
      chemicalElements: {
        icon: FlaskConicalIcon,
        title: "menu:general.chemicalElements",
        url: CHEMICAL_ELEMENTS_PATHS.basePath,
        permissions: [AUTH_PERMISSIONS.CHEMICAL_ELEMENTS_READ],
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

  settings: {
    title: "menu:settings.title",
    permissions: [AUTH_PERMISSIONS.ADMIN],
    items: {
      settings: {
        icon: SettingsIcon,
        title: "menu:settings.title",
        url: SETTINGS_PATHS.basePath,
        defaultOpen: true,
        items: [
          {
            title: "menu:settings.millTypes",
            url: SETTINGS_PATHS.millTypesPath,
            permissions: [AUTH_PERMISSIONS.MILL_TYPES_READ],
          },
          {
            title: "menu:settings.profileTypes",
            url: SETTINGS_PATHS.profileTypesPath,
            permissions: [AUTH_PERMISSIONS.PROFILE_TYPES_READ],
          },
          {
            title: "menu:settings.passGeometryTypes",
            url: SETTINGS_PATHS.passGeometryTypesPath,
            permissions: [AUTH_PERMISSIONS.PASS_GEOMETRY_TYPES_READ],
          },
        ],
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
