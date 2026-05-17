import {
  AlignVerticalDistributeCenterIcon,
  AnvilIcon,
  ChessRookIcon,
  DiscIcon,
  LayoutDashboardIcon,
  LayersIcon,
  LockKeyholeIcon,
  PaintRollerIcon,
  Settings2Icon,
  SettingsIcon,
  ShieldIcon,
  StretchHorizontalIcon,
  ToolboxIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";

import { AUTH_PERMISSIONS } from "@/modules/auth/constants/auth.permissions";
import { useAuth } from "@/modules/auth/contexts/auth-context";
import { DASHBOARD_PATHS } from "@/modules/dashboard/constants/dashboard.paths";
import { CALIBRATIONS_PERMISSIONS } from "@/modules/operations/calibrations/constants/calibrations.permissions";
import { OPERATIONS_PATHS } from "@/modules/operations/shared/constants/operations.paths";
import { SECURITY_PATHS } from "@/modules/security/shared/constants/security.paths";
import { BEARINGS_PERMISSIONS } from "@/modules/settings/bearings/constants/bearings.permissions";
import { ENGINES_PERMISSIONS } from "@/modules/settings/engines/constants";
import { MATERIALS_PERMISSIONS } from "@/modules/settings/materials/constants/materials.permissions";
import { MILL_TYPES_PERMISSIONS } from "@/modules/settings/mill-types/constants";
import { ROLLERS_PERMISSIONS } from "@/modules/settings/rollers/constants";
import { ROLLING_MILLS_PERMISSIONS } from "@/modules/settings/rolling-mills/constants";
import { SETTINGS_PATHS } from "@/modules/settings/shared/constants/settings.paths";
import { STANDS_PERMISSIONS } from "@/modules/settings/stands/constants";

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
      calibrations: {
        id: "operations-calibrations",
        icon: LayersIcon,
        label: "menu:operations.calibrations",
        route: OPERATIONS_PATHS.CALIBRATIONS,
        permissions: [CALIBRATIONS_PERMISSIONS.READ],
      },
    },
  },
  settings: {
    id: "settings",
    icon: SettingsIcon,
    label: "menu:settings.title",
    hasSubItems: true,
    subItems: {
      materials: {
        id: "settings-materials",
        icon: AnvilIcon,
        label: "menu:settings.materials",
        route: SETTINGS_PATHS.MATERIALS,
        permissions: [MATERIALS_PERMISSIONS.READ],
      },
      bearings: {
        id: "settings-bearings",
        icon: DiscIcon,
        label: "menu:settings.bearings",
        route: SETTINGS_PATHS.BEARINGS,
        permissions: [BEARINGS_PERMISSIONS.READ],
      },
      millTypes: {
        id: "settings-mill-types",
        icon: AlignVerticalDistributeCenterIcon,
        label: "menu:settings.millTypes",
        route: SETTINGS_PATHS.MILL_TYPES,
        permissions: [MILL_TYPES_PERMISSIONS.READ],
      },
      rollingMills: {
        id: "settings-rolling-mills",
        icon: StretchHorizontalIcon,
        label: "menu:settings.rollingMills",
        route: SETTINGS_PATHS.ROLLING_MILLS,
        permissions: [ROLLING_MILLS_PERMISSIONS.READ],
      },
      stands: {
        id: "settings-stands",
        icon: ChessRookIcon,
        label: "menu:settings.stands",
        route: SETTINGS_PATHS.STANDS,
        permissions: [STANDS_PERMISSIONS.READ],
      },
      engines: {
        id: "settings-engines",
        icon: ToolboxIcon,
        label: "menu:settings.engines",
        route: SETTINGS_PATHS.ENGINES,
        permissions: [ENGINES_PERMISSIONS.READ],
      },

      rollers: {
        id: "settings-rollers",
        icon: PaintRollerIcon,
        label: "menu:settings.rollers",
        route: SETTINGS_PATHS.ROLLERS,
        permissions: [ROLLERS_PERMISSIONS.READ],
      },
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
        route: SECURITY_PATHS.ROLES,
      },
      users: {
        id: "security.users",
        icon: UsersIcon,
        label: "menu:security.users",
        route: SECURITY_PATHS.USERS,
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
