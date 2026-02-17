import { ApiClient } from "@/lib/api-client";
import type { Notification } from "@/modules/notifications/interfaces/notification.interface";
import { ApiService } from "@/shared/services/api.service";

const NOTIFICATIONS_SERVICE_BASE_PATH = "/notifications" as const;

class NotificationsService extends ApiService {
  async getUserNotifications() {
    const { data } = await ApiClient.get<Notification[] | undefined>(
      this.getPath(),
    );

    return data;
  }

  async markAsRead(notificationId: string | undefined) {
    if (!notificationId)
      throw new Error("Notification ID is required to update status");

    const { data } = await ApiClient.patch<void>(
      this.getPath(`/${notificationId}/read`),
    );

    return data;
  }
}

export default new NotificationsService(NOTIFICATIONS_SERVICE_BASE_PATH);
