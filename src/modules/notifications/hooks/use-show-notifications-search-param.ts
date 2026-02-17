import { useCallback } from "react";
import { useSearchParams } from "react-router";

import { NOTIFICATIONS_SHOW_KEY } from "@/modules/notifications/constants/notification.queries";

export const useShowNotificationsSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isOpenNotifications = !!searchParams.get(NOTIFICATIONS_SHOW_KEY);

  const onToggleNotifications = useCallback(() => {
    if (!isOpenNotifications) {
      searchParams.set(NOTIFICATIONS_SHOW_KEY, "show");
    } else {
      searchParams.delete(NOTIFICATIONS_SHOW_KEY);
    }

    setSearchParams(searchParams);
  }, [isOpenNotifications, searchParams, setSearchParams]);

  return {
    isOpenNotifications,
    onToggleNotifications,
  };
};
