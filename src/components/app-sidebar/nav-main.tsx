import { ChevronRightIcon } from "lucide-react";
import { useCallback } from "react";
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

  const handleClick = useCallback(() => {
    if (!open) return;

    toggleSidebar();
  }, [open, toggleSidebar]);

  return (
    <>
      {Object.entries(sections).map(([key, section]) => {
        return (
          <SidebarGroup key={key}>
            <SidebarGroupLabel>{t(section.title)}</SidebarGroupLabel>

            <SidebarMenu>
              {Object.entries(section.items).map(([key, item]) => {
                if (!item?.items?.length) {
                  return (
                    <SidebarMenuItem
                      key={key}
                      
                    >
                      <SidebarMenuButton
                        asChild
                        tooltip={t(item.title)}
                        onClick={handleClick}
                        className={cn({
                        "bg-primary/50 hover:bg-primary/20": item?.exact
                          ? pathname === item.url
                          : pathname.includes(item.url),
                      })}
                      >
                        <Link to={item.url}>
                          <item.icon />

                          <span>{t(item.title)}</span>

                          <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                return (
                  <Collapsible
                    key={key}
                    asChild
                    defaultOpen={!!item?.defaultOpen}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          <item.icon />

                          <span>{item.title}</span>

                          <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                onClick={handleClick}
                              >
                                <Link to={subItem.url}>{subItem.title}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        );
      })}
    </>
  );
};

export default NavMain;
