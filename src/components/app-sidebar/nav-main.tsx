import { ChevronRightIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useMenu } from "@/hooks/use-menu";
import { cn } from "@/lib/utils";

const NavMain = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { sections } = useMenu();
  const { open, toggleSidebar } = useSidebar();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleClick = useCallback(() => {
    if (!open) return;
    toggleSidebar();
  }, [open, toggleSidebar]);

  const isRouteActive = useCallback(
    (route?: string) => {
      if (!route) return false;
      return pathname === route || pathname.startsWith(route + "/");
    },
    [pathname],
  );

  return (
    <>
      {Object.entries(sections).map(([key, section]) => {
        const hasSubItems = section.hasSubItems && section.subItems && Object.keys(section.subItems).length > 0;

        return (
          <SidebarGroup key={key}>
            <SidebarGroupLabel>{t(section.label)}</SidebarGroupLabel>
            <SidebarMenu>
              {!hasSubItems ? (
                <SidebarMenuItem key={section.id}>
                  <SidebarMenuButton
                    asChild
                    tooltip={t(section.label)}
                    onClick={handleClick}
                    className={cn({
                      "bg-primary/50 hover:bg-primary/20": isRouteActive(section.route),
                    })}
                  >
                    <Link to={section.route || "#"}>
                      <section.icon />
                      <span>{t(section.label)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ) : (
                <Collapsible
                  key={section.id}
                  asChild
                  defaultOpen={activeItem === section.id}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={t(section.label)}
                        onClick={() =>
                          setActiveItem(activeItem === section.id ? null : section.id)
                        }
                      >
                        <section.icon />
                        <span>{t(section.label)}</span>
                        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {Object.entries(section.subItems || {}).map(([subKey, subItem]) => (
                          <SidebarMenuSubItem key={subKey}>
                            <SidebarMenuSubButton
                              asChild
                              onClick={handleClick}
                              className={cn({
                                "bg-primary/50 hover:bg-primary/20": isRouteActive(subItem.route),
                              })}
                            >
                              <Link to={subItem.route || "#"}>{t(subItem.label)}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
            </SidebarMenu>
          </SidebarGroup>
        );
      })}
    </>
  );
};

export default NavMain;