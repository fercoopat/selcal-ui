import type { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";
import { Link } from "react-router";

import { ProjectsListRowActions } from "@/modules/projects/components/projects-list-row-actions";
import type { Project } from "@/modules/projects/interfaces/project.interface";
import { USERS_PATHS } from "@/modules/security/users/constants/users-paths";
import { formatDateValue } from "@/shared/utils/date.utils";
import { joinText } from "@/shared/utils/text.utils";

export const projectsListColumns: ColumnDef<Project | undefined>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: t("projects:fields.name"),
  },

  {
    id: "description",
    header: t("projects:fields.description"),
    accessorKey: "description",
  },

  {
    id: "startDate",
    header: t("projects:fields.startDate"),
    cell: ({ row }) => formatDateValue(row?.original?.startDate),
  },

  {
    id: "endDate",
    header: t("projects:fields.endDate"),
    cell: ({ row }) => formatDateValue(row?.original?.endDate),
  },

  {
    id: "author",
    header: t("projects:fields.author"),
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const project = row.original;

      return <ProjectsListRowActions project={project} />;
    },
  },
];
