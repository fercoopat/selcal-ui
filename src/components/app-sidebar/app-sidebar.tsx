import { XIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import NavUser from "@/components/app-sidebar/nav-user";
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
  const [activeItem, setActiveItem] = useState<string | null>("");
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

  const sidebarItems = Object.values(sections);
  const activeItemData = sidebarItems.find((item) => item.id === activeItem);

  const handleItemClick = (item: SidebarItem) => {
    if (item.hasSubItems && item.subItems) {
      const isActive = activeItem === item.id;
      setActiveItem(isActive ? null : item.id);
      if (isActive) {
        setSelectedSubItem(null);
      }
    } else if (item.route) {
      navigate(item.route);
      setActiveItem(null);
      setSelectedSubItem(null);
    }
  };

  const handleSubItemClick = (subItem: SidebarSubItem) => {
    setSelectedSubItem(selectedSubItem === subItem.id ? null : subItem.id);
    if (subItem.route) {
      navigate(subItem.route);
    }
  };

  const isRouteActive = (route?: string) => {
    if (!route) return false;
    return (
      location.pathname === route || location.pathname.startsWith(route + "/")
    );
  };

  return (
    <div className="bg-background flex h-dvh">
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
                  // const isActive = activeItem === item.id;

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={isRouteActive(item.route)}
                        className="h-10 w-full px-3"
                        tooltip={t(item.label)}
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <Icon className="h-4 w-4 shrink-0" />
                        </div>
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

      {activeItem && activeItemData?.subItems && (
        <Sidebar
          side="left"
          variant="sidebar"
          collapsible="none"
          className="animate-in slide-in-from-left-5 w-72 border-r duration-200"
        >
          <SidebarHeader className="flex flex-row items-center justify-between border-b px-4">
            <h3 className="font-medium">{t(activeItemData.label)}</h3>
            <button
              onClick={() => setActiveItem(null)}
              className="hover:bg-sidebar-accent flex h-6 w-6 items-center justify-center rounded-md p-0"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {Object.values(activeItemData.subItems).map((subItem) => {
                    const SubIcon = subItem.icon;

                    return (
                      <SidebarMenuItem key={subItem.id}>
                        <SidebarMenuButton
                          isActive={isRouteActive(subItem.route)}
                          className="h-auto w-full justify-start gap-3 px-3 py-2"
                          onClick={() => handleSubItemClick(subItem)}
                        >
                          <SubIcon className="mt-0.5 h-5 w-5 shrink-0 self-start" />

                          <div className="min-w-0 flex-1 text-left">
                            <div className="font-medium">
                              {t(subItem.label)}
                            </div>
                            {subItem.description && (
                              <div className="text-muted-foreground mt-0.5 text-xs">
                                {subItem.description}
                              </div>
                            )}
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
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
