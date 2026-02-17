import {
  BadgeCheckIcon,
  BellIcon,
  ChevronsUpDown,
  LogOutIcon,
} from "lucide-react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { PageLoader } from "@/components/loaders";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/modules/auth/contexts/auth-context";
import { useLogout } from "@/modules/auth/hooks/use-logout";
import { NotificationsSheet } from "@/modules/notifications/components/notifications-sheet";
import { useShowNotificationsSearchParam } from "@/modules/notifications/hooks/use-show-notifications-search-param";
import { USERS_PATHS } from "@/modules/security/users/constants/users-paths";
import { joinText } from "@/shared/utils/text.utils";

const NavUserInfo = () => {
  const { currentUser: user } = useAuth();

  const { avatarFallback, fullName } = useMemo(
    () => ({
      fullName: joinText([user?.firstName, user?.lastName]),
      avatarFallback: `${user?.firstName?.split("").at(0)}${user?.lastName?.split("").at(0)}`,
    }),
    [user?.firstName, user?.lastName],
  );

  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={user?.avatar} alt={fullName} />
        <AvatarFallback className="rounded-lg">{avatarFallback}</AvatarFallback>
      </Avatar>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{fullName}</span>
        <span className="truncate text-xs">{user?.email}</span>
      </div>
    </>
  );
};

const NavUser = () => {
  const { t } = useTranslation();
  const { isMobile, open, toggleSidebar } = useSidebar();
  const { isLoading, logout } = useLogout();

  const { currentUser: user } = useAuth();

  const { onToggleNotifications } = useShowNotificationsSearchParam();

  const handleLogout = useCallback(() => {
    logout();
    if (!open) return;
    toggleSidebar();
  }, [logout, open, toggleSidebar]);

  if (isLoading) {
    return <PageLoader size="screen" />;
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <NavUserInfo />

                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <NavUserInfo />
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to={USERS_PATHS.detailsPath(user?.id)}>
                    <BadgeCheckIcon />
                    {t("users:account")}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onToggleNotifications}>
                  <BellIcon />
                  {t("common:notifications")}
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout}>
                <LogOutIcon />

                <span>{t("auth:logout.action")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <NotificationsSheet />
    </>
  );
};
export default NavUser;
