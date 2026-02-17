import type { IssueStatus } from '@/modules/issues/constants/issue-status';

export interface DashboardReports {
  totalIssues: number;
  openIssues: number;
  closedIssues: number;
  avgResolutionTime: number;
  closureRate: number;
  totalProjects: number;
  issuesByStatus: IssuesByStatus[];
  issuesByPriority: IssuesByPriority[];
  issuesByType: IssuesByType[];
  issuesByProject: IssuesByProject[];
  avgResolutionTimeByPriority: Array<{ priority: string; avgTime: number }>;
  issuesResolvedOverTime: Array<{ period: string; count: number }>;
}

export interface IssuesByPriority {
  priority: string;
  count: number;
}

export interface IssuesByProject {
  projectName: string;
  count: number;
  status: IssueStatus
}

export interface IssuesByStatus {
  status: string;
  count: number;
}

export interface IssuesByType {
  type: string;
  count: number;
}
