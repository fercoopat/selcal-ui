export const ISSUE_TYPE = {
  TASK: "task",
  BUG: "bug",
  FEATURE: "feature",
  SUPPORT: "support",
  IMPROVEMENT: "improvement",
} as const;

export const ISSUE_TYPE_VALUES = Object.values(ISSUE_TYPE);

export type IssueType = (typeof ISSUE_TYPE)[keyof typeof ISSUE_TYPE];
