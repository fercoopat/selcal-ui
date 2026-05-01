import {
  LayoutDashboardIcon,
  LockKeyholeIcon,
  Settings2Icon,
  SettingsIcon,
  ShieldIcon,
  UsersIcon,
  type LucideIcon
} from "lucide-react";
import { useMemo } from "react";

import { AUTH_PERMISSIONS } from "@/modules/auth/constants/auth.permissions";
import { useAuth } from "@/modules/auth/contexts/auth-context";
import { DASHBOARD_PATHS } from "@/modules/dashboard/constants/dashboard.paths";
import { SECURITY_PATHS } from "@/modules/security/shared/constants/security.paths";

export interface SidebarSubItem {
  id: string;
  label: string;
  icon: LucideIcon;
  description?: string;
  route?: string;
  permissions?: string[];
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  hasSubItems?: boolean;
  route?: string;
  subItems?: Record<string, SidebarSubItem>;
  permissions?: string[];
}

const SIDEBAR_ITEMS_MAP: Record<string, SidebarItem> = {
  dashboard: {
    id: "dashboard",
    label: "menu:general.dashboard",
    icon: LayoutDashboardIcon,
    route: DASHBOARD_PATHS.BASE_PATH,
  },
  operations: {
    id: "operations",
    label: "menu:operations.title",
    icon: Settings2Icon,
    hasSubItems: true,
    subItems: {
      // calibrations: {
      //   id: "operations-calibrations",
      //   icon: LayersIcon,
      //   label: "menu:general.calibrations",
      //   route: CALIBRATIONS_PATHS.LIST,
      //   permissions: [CALIBRATIONS_PERMISSIONS.READ],
      // },

      // rollingMills: {
      //   id: "operations.rolling-mills",
      //   icon: LayersIcon,
      //   label: "menu:general.rollingMills",
      //   route: ROLLING_MILLS_PATHS.BASE_PATH,
      //   permissions: [ROLLING_MILLS_PERMISSIONS.READ],
      // },
      // chemicalElements: {
      //   id: "operations.chemical-elements",
      //   icon: FlaskConicalIcon,
      //   label: "menu:general.chemicalElements",
      //   route: CHEMICAL_ELEMENTS_PATHS.LIST,
      //   permissions: [CHEMICAL_ELEMENTS_PERMISSIONS.READ],
      // },
    },
  },
  settings: {
    id: "settings",
    icon: SettingsIcon,
    label: "menu:settings.title",
    hasSubItems: true,
    subItems: {
      // materials: {
      //   id: "settings-materials",
      //   icon: AnvilIcon,
      //   label: "menu:settings.materials",
      //   route: MATERIAL_GRADES_PATHS.LIST,
      //   permissions: [MATERIAL_GRADES_PERMISSIONS.READ],
      // },
      // millTypes: {
      //   id: "settings.mill-types",
      //   icon: SettingsIcon,
      //   label: "menu:settings.millTypes",
      //   route: SETTINGS_PATHS.MILL_TYPES,
      //   permissions: [MILL_TYPES_PERMISSIONS.READ],
      // },
      // profileTypes: {
      //   id: "settings.profile-types",
      //   icon: SettingsIcon,
      //   label: "menu:settings.profileTypes",
      //   route: SETTINGS_PATHS.PROFILE_TYPES,
      //   permissions: [PROFILE_TYPES_PERMISSIONS.READ],
      // },
      // passGeometryTypes: {
      //   id: "settings.pass-geometry-types",
      //   icon: SettingsIcon,
      //   label: "menu:settings.passGeometryTypes",
      //   route: SETTINGS_PATHS.PASS_GEOMETRY_TYPES,
      //   permissions: [PASS_GEOMETRY_TYPES_PERMISSIONS.READ],
      // },
    },
  },
  security: {
    id: "security",
    icon: LockKeyholeIcon,
    label: "menu:security.title",
    permissions: [AUTH_PERMISSIONS.ADMIN],
    hasSubItems: true,
    subItems: {
      roles: {
        id: "security.roles",
        icon: ShieldIcon,
        label: "menu:security.roles",
        route: SECURITY_PATHS.rolesPath,
      },
      users: {
        id: "security.users",
        icon: UsersIcon,
        label: "menu:security.users",
        route: SECURITY_PATHS.usersPath,
      },
    },
  },
};

export const useMenu = () => {
  const { hasPermission } = useAuth();

  const sections = useMemo(() => {
    const filteredItems: Record<string, SidebarItem> = {};

    Object.entries(SIDEBAR_ITEMS_MAP).forEach(([itemKey, item]) => {
      if (!hasPermission(item?.permissions)) return;

      let filteredSubItems: Record<string, SidebarSubItem> | undefined;

      if (item.subItems && item.hasSubItems) {
        filteredSubItems = {};

        Object.entries(item.subItems).forEach(([subItemKey, subItem]) => {
          if (!hasPermission(subItem?.permissions)) return;
          filteredSubItems![subItemKey] = subItem;
        });

        if (Object.keys(filteredSubItems).length === 0) {
          filteredSubItems = undefined;
        }
      }

      filteredItems[itemKey] = {
        ...item,
        subItems: filteredSubItems,
        hasSubItems: !!filteredSubItems,
      };
    });

    return filteredItems;
  }, [hasPermission]);

  return { sections };
};
