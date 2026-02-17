import type { NotificationType } from "@/modules/notifications/constants/notification-status";
import type { User } from "@/modules/security/users/interfaces/user.interface";
import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface Notification extends CommonFields {
  user: User;
  title: string;
  message?: string;
  type: NotificationType;
  read: boolean;
}
