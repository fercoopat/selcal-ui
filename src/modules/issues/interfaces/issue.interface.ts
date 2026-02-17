import type { IssuePriority } from "@/modules/issues/constants/issue-priority";
import type { IssueStatus } from "@/modules/issues/constants/issue-status";
import type { IssueType } from "@/modules/issues/constants/issue-type";
import type { Project } from "@/modules/projects/interfaces/project.interface";
import type { User } from "@/modules/security/users/interfaces/user.interface";
import type { CommonFields } from "@/shared/interfaces/common.interface";

export interface Issue extends CommonFields {
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  priority: IssuePriority;
  project: Project;
  author: User;
  assignedTo: User | null;
  estimatedHours: number;
  actualHours: number;
  dueDate: string;
  startDate: string;
  doneDate: string;
}
