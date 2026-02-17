import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { NOTIFICATIONS_QUERIES } from "@/modules/notifications/constants/notification.queries";
import { NotificationsService } from "@/modules/notifications/services";

type Params = {
  notificationId: string | undefined;
  onSuccess?: () => void;
};

export const useMarkAsReadNotification = ({
  notificationId,
  onSuccess,
}: Params) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { error, isPending, mutate } = useMutation({
    mutationFn: () => NotificationsService.markAsRead(notificationId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: NOTIFICATIONS_QUERIES.userNotifications,
      });

      toast.success(t("common:notifications.markAsRead.success"));

      onSuccess?.();
    },
  });

  const markAsRead = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    error,
    isLoading: isPending,
    markAsRead,
  };
};
