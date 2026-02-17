import type { AlertProps } from "@/components/ui/alert";
import {
  CheckCircle2Icon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
  type LucideIcon,
} from "lucide-react";

export const NOTIFICATION_TYPE = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
} as const;

export const NOTIFICATION_TYPE_VALUES = Object.values(NOTIFICATION_TYPE);

export type NotificationType =
  (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];

export const NOTIFICATION_TYPE_ALERT_ICON_MAP: Record<
  NotificationType,
  LucideIcon
> = {
  [NOTIFICATION_TYPE.INFO]: InfoIcon,
  [NOTIFICATION_TYPE.SUCCESS]: CheckCircle2Icon,
  [NOTIFICATION_TYPE.WARNING]: TriangleAlertIcon,
  [NOTIFICATION_TYPE.ERROR]: CircleXIcon,
};

export const NOTIFICATION_TYPE_ALERT_COLOR_MAP: Record<
  NotificationType,
  AlertProps["variant"]
> = {
  [NOTIFICATION_TYPE.INFO]: "info",
  [NOTIFICATION_TYPE.SUCCESS]: "success",
  [NOTIFICATION_TYPE.WARNING]: "warning",
  [NOTIFICATION_TYPE.ERROR]: "error",
};
