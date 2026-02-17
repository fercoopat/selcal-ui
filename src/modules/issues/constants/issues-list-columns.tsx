import type { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { Link } from "react-router";

import { Badge } from "@/components/ui/badge";
import { IssuesListRowActions } from "@/modules/issues/components/issues-list-row-actions";
import { ISSUE_PRIORITY_COLOR_MAP } from "@/modules/issues/constants/issue-priority";
import { ISSUE_STATUS_COLOR_MAP } from "@/modules/issues/constants/issue-status";
import type { Issue } from "@/modules/issues/interfaces/issue.interface";
import { PROJECTS_PATHS } from "@/modules/projects/constants/projects-paths";
import { USERS_PATHS } from "@/modules/security/users/constants/users-paths";
import { formatDateValue } from "@/shared/utils/date.utils";
import { joinText } from "@/shared/utils/text.utils";

export const issuesListColumns: ColumnDef<Issue | undefined>[] = [
  {
    id: "title",
    accessorKey: "title",
    header: t("issues:fields.title"),
  },

  {
    id: "description",
    header: t("issues:fields.description"),
    accessorKey: "description",
  },

  {
    id: "type",
    header: t("issues:fields.type"),
    cell: ({ row }) => <Badge>{t(`issues:type.${row.original?.type}`)}</Badge>,
  },

  {
    id: "status",
    header: t("issues:fields.status"),
    cell: ({ row }) => {
      const status = row.original?.status;

      if (!status) return null;

      return (
        <Badge variant={ISSUE_STATUS_COLOR_MAP[status]}>
          {t(`issues:status.${status}`)}
        </Badge>
      );
    },
  },

  {
    id: "priority",
    header: t("issues:fields.priority"),
    cell: ({ row }) => {
      const priority = row.original?.priority;

      if (!priority) return null;

      return (
        <Badge variant={ISSUE_PRIORITY_COLOR_MAP[priority]}>
          {t(`issues:priority.${priority}`)}
        </Badge>
      );
    },
  },

  {
    id: "project",
    header: t("issues:fields.project"),
    cell: ({ row }) => {
      const project = row.original?.project;

      return (
        <Link
          to={PROJECTS_PATHS.detailsPath(project?.id)}
          className="underline"
        >
          {project?.name}
        </Link>
      );
    },
  },

  {
    id: "author",
    header: t("issues:fields.author"),
    cell: ({ row }) => {
      const author = row.original?.author;

      return (
        <Link to={USERS_PATHS.detailsPath(author?.id)} className="underline">
          {joinText([author?.firstName, author?.lastName])}
        </Link>
      );
    },
  },

  {
    id: "assignedTo",
    header: t("issues:fields.assignedTo"),
    cell: ({ row }) => {
      const assignedTo = row.original?.assignedTo;

      return (
        <Link
          to={USERS_PATHS.detailsPath(assignedTo?.id)}
          className="underline"
        >
          {joinText([assignedTo?.firstName, assignedTo?.lastName])}
        </Link>
      );
    },
  },

  {
    id: "estimatedHours",
    header: t("issues:fields.estimatedHours"),
    accessorKey: "estimatedHours",
  },

  {
    id: "actualHours",
    header: t("issues:fields.actualHours"),
    accessorKey: "actualHours",
  },

  {
    id: "startDate",
    header: t("issues:fields.startDate"),
    cell: ({ row }) => formatDateValue(row?.original?.startDate),
  },

  {
    id: "dueDate",
    header: t("issues:fields.dueDate"),
    cell: ({ row }) => formatDateValue(row?.original?.dueDate),
  },

  {
    id: "doneDate",
    header: t("issues:fields.doneDate"),
    cell: ({ row }) => formatDateValue(row?.original?.doneDate),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const issue = row.original;

      return <IssuesListRowActions issue={issue} />;
    },
  },
];
