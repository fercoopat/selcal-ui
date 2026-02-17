import { useTranslation } from "react-i18next";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ConditionContainer from "@/components/ui/condition-container";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  NOTIFICATION_TYPE_ALERT_COLOR_MAP,
  NOTIFICATION_TYPE_ALERT_ICON_MAP,
} from "@/modules/notifications/constants/notification-status";
import { useNotifications } from "@/modules/notifications/hooks/use-notifications";
import { useShowNotificationsSearchParam } from "@/modules/notifications/hooks/use-show-notifications-search-param";
import { InboxIcon } from "lucide-react";

const NotificationsSkeletons = () => (
  <>
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="flex items-start gap-3 rounded-lg border p-4">
        <Skeleton className="h-5 w-5 rounded-full" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      </div>
    ))}
  </>
);

const NotificationsSheet = () => {
  const { t } = useTranslation();

  const { isLoading, notifications } = useNotifications();

  const { isOpenNotifications, onToggleNotifications } =
    useShowNotificationsSearchParam();

  return (
    <Sheet open={isOpenNotifications} onOpenChange={onToggleNotifications}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("common:notifications")}</SheetTitle>

          <SheetDescription>
            {t("users:notifications.subtitle")}
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <ConditionContainer
            renderChildrenWhen={!isLoading}
            fallback={<NotificationsSkeletons />}
          >
            <ConditionContainer
              renderChildrenWhen={!!notifications?.length}
              fallback={
                <div className="text-muted-foreground flex flex-col items-center justify-center gap-3 py-12 text-center">
                  <InboxIcon className="h-10 w-10" />
                  <p className="text-sm font-medium">
                    {t(
                      "users:notifications.empty.title",
                      "No tienes notificaciones",
                    )}
                  </p>
                  <p className="text-xs">
                    {t(
                      "users:notifications.empty.description",
                      "Cuando algo importante ocurra, lo verás aquí",
                    )}
                  </p>
                </div>
              }
            >
              {notifications?.map((notification) => {
                const Icon =
                  NOTIFICATION_TYPE_ALERT_ICON_MAP[notification.type];

                return (
                  <Alert
                    key={notification.id}
                    variant={
                      NOTIFICATION_TYPE_ALERT_COLOR_MAP[notification.type]
                    }
                  >
                    <Icon />

                    <AlertTitle>{notification.title}</AlertTitle>

                    <AlertDescription>{notification.message}</AlertDescription>
                  </Alert>
                );
              })}
            </ConditionContainer>
          </ConditionContainer>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default NotificationsSheet;
