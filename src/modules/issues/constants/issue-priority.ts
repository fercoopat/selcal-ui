export const ISSUE_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const;

export const ISSUE_PRIORITY_VALUES = Object.values(ISSUE_PRIORITY);

export type IssuePriority =
  (typeof ISSUE_PRIORITY)[keyof typeof ISSUE_PRIORITY];

export const ISSUE_PRIORITY_COLOR_MAP: Record<
  string,
  "destructive" | "warning" | "secondary"
> = {
  high: "destructive",
  medium: "warning",
  low: "secondary",
};
