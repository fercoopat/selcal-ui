import { XIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import NavUser from "@/components/app-sidebar/nav-user";
import { IconButton } from "@/components/buttons";
import { AppLogoIcon } from "@/components/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  useMenu,
  type SidebarItem,
  type SidebarSubItem,
} from "@/hooks/use-menu";

const AppSidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { sections } = useMenu();
  const [activeParent, setActiveParent] = useState<string | null>(null);

  const sidebarItems = useMemo(() => Object.values(sections), [sections]);
  const activeParentData = useMemo(
    () => sidebarItems.find((item) => item.id === activeParent),
    [activeParent, sidebarItems],
  );

  const isRouteActive = useCallback(
    (route?: string) => {
      if (!route) return false;
      return (
        location.pathname === route || location.pathname.startsWith(route + "/")
      );
    },
    [location.pathname],
  );

  const handleItemClick = useCallback(
    (item: SidebarItem) => {
      if (item.hasSubItems && item.subItems) {
        const isActive = activeParent === item.id;

        if (isActive) {
          setActiveParent(null);
          return;
        }

        setActiveParent(item.id);
      } else if (item.route) {
        navigate(item.route);
        setActiveParent(null);
      }
    },
    [activeParent, navigate],
  );

  const handleSubItemClick = useCallback(
    (subItem: SidebarSubItem) => {
      if (subItem.route) {
        navigate(subItem.route);
      }
    },
    [navigate],
  );

  const handleCloseDrawer = useCallback(() => {
    setActiveParent(null);
  }, [setActiveParent]);

  return (
    <div className="flex h-dvh">
      <Sidebar
        side="left"
        variant="sidebar"
        collapsible="icon"
        className="w-64 border-r"
      >
        <SidebarHeader>
          <AppLogoIcon className="mx-auto mt-2 size-6" />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={isRouteActive(item.route)}
                        className="h-10 w-full cursor-pointer px-3"
                        tooltip={t(item.label)}
                        onClick={() => handleItemClick(item)}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{t(item.label)}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>

      {activeParent && activeParentData?.subItems && (
        <Sidebar
          side="left"
          variant="sidebar"
          collapsible="none"
          className="animate-in slide-in-from-left-5 w-72 border-r duration-200"
        >
          <SidebarHeader className="flex flex-row items-center justify-between border-b px-4">
            <h3 className="font-medium">{t(activeParentData.label)}</h3>
            <IconButton
              onClick={handleCloseDrawer}
              className="hover:bg-sidebar-accent flex h-6 w-6 items-center justify-center rounded-full p-0"
            >
              <XIcon className="h-4 w-4" />
            </IconButton>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {Object.values(activeParentData.subItems).map((subItem) => (
                    <SidebarMenuItem key={subItem.id}>
                      <SidebarMenuSubButton
                        className="cursor-pointer"
                        isActive={isRouteActive(subItem.route)}
                        onClick={() => handleSubItemClick(subItem)}
                      >
                        <subItem.icon className="h-4 w-4" />
                        <span>{t(subItem.label)}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </div>
  );
};

export default AppSidebar;
