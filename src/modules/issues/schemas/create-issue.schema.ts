import z from "zod";

import { ISSUE_PRIORITY_VALUES } from "@/modules/issues/constants/issue-priority";
import { ISSUE_STATUS_VALUES } from "@/modules/issues/constants/issue-status";
import { ISSUE_TYPE_VALUES } from "@/modules/issues/constants/issue-type";
import { createDateSchema } from "@/shared/schemas/date.schema";

export const createIssueSchema = z.object({
  title: z.string("required").min(1, "min-1-char"),
  description: z.string().optional(),
  type: z.enum(ISSUE_TYPE_VALUES, "required"),
  status: z.enum(ISSUE_STATUS_VALUES, "required"),
  priority: z.enum(ISSUE_PRIORITY_VALUES, "required"),
  projectId: z.string("required"),
  assignedToId: z.string("required"),
  estimatedHours: z.coerce.number("required").min(0, "min-0-num"),
  actualHours: z.coerce.number("required").min(0, "min-0-num").optional(),
  dueDate: createDateSchema({ message: "required" }).optional().nullable(),
  startDate: createDateSchema({ message: "required" }).optional().nullable(),
  doneDate: createDateSchema({ message: "required" }).optional().nullable(),
});

export type CreateIssuePayload = z.infer<typeof createIssueSchema>;
