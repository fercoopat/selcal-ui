import type { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";

import { Badge } from "@/components/ui/badge";
import { RolesListRowActions } from "@/modules/security/roles/components/roles-list-row-actions";
import type { Role } from "@/modules/security/roles/interfaces/role.interface";

export const rolesListColumns: ColumnDef<Role>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: t("roles:fields.name"),
  },

  {
    id: "description",
    header: t("roles:fields.description"),
    cell: ({ row }) => {
      const role = row.original;

      return (
        <span className="text-pretty whitespace-normal">
          {role.description}
        </span>
      );
    },
  },

  {
    id: "permissions",
    header: t("roles:fields.permissions"),
    cell: ({ row }) => {
      const role = row.original;

      return (
        <div className="flex max-w-2xl flex-wrap items-center gap-2">
          {role.permissions.map((permission, index) => (
            <Badge key={index}>{t(`permissions:${permission}`)}</Badge>
          ))}
        </div>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const role = row.original;

      return <RolesListRowActions role={role} />;
    },
  },
];
