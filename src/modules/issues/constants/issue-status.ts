import type { BadgeProps } from "@/components/ui/badge";

export const ISSUE_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  REVIEW: "review",
  DONE: "done",
  BLOCKED: "blocked",
  CANCELLED: "cancelled",
} as const;

export const ISSUE_STATUS_VALUES = Object.values(ISSUE_STATUS);

export type IssueStatus = (typeof ISSUE_STATUS)[keyof typeof ISSUE_STATUS];

export const ISSUE_STATUS_COLOR_MAP: Record<string, BadgeProps["variant"]> = {
  todo: "secondary",
  in_progress: "warning",
  review: "warning",
  done: "success",
  cancelled: "destructive",
  blocked: "destructive", // opcional
};
