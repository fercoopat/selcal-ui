import { useQuery } from "@tanstack/react-query";

import { NOTIFICATIONS_QUERIES } from "@/modules/notifications/constants/notification.queries";
import { NotificationsService } from "@/modules/notifications/services";

export const useNotifications = () => {
  const {
    data: notifications,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => NotificationsService.getUserNotifications(),
    queryKey: NOTIFICATIONS_QUERIES.userNotifications,
  });

  return {
    notifications,
    error,
    isLoading,
  };
};
