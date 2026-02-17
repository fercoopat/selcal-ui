import {
  LayoutDashboardIcon,
  ListTodoIcon,
  MapIcon,
  ShieldIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";

import { AUTH_PERMISSIONS } from "@/modules/auth/constants/auth-permissions";
import { useAuth } from "@/modules/auth/contexts/auth-context";
import { DASHBOARD_PATHS } from "@/modules/dashboard/constants/dashboard-paths";
import { ISSUES_PATHS } from "@/modules/issues/constants/issues-paths";
import { ISSUES_PERMISSIONS } from "@/modules/issues/constants/issues.permissions";
import { PROJECTS_PATHS } from "@/modules/projects/constants/projects-paths";
import { PROJECTS_PERMISSIONS } from "@/modules/projects/constants/projects-permissions";
import { SECURITY_PATHS } from "@/modules/security/shared/constants/security-paths";

type MenuItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  defaultOpen?: boolean;
  permissions?: string[];
  exact?: boolean
  items?: Array<{
    title: string;
    url: string;
    permissions?: string[];
    exact?: boolean
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

      projects: {
        icon: MapIcon,
        title: "menu:general.projects",
        url: PROJECTS_PATHS.basePath,
        permissions: [PROJECTS_PERMISSIONS.READ],
      },

      issues: {
        icon: ListTodoIcon,
        title: "menu:general.issues",
        url: ISSUES_PATHS.basePath,
        permissions: [ISSUES_PERMISSIONS.READ],
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

  return {
    sections,
  };
};
