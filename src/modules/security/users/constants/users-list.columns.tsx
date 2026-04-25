import type { ColumnDef } from "@tanstack/react-table";
import { t } from "i18next";

import { PermissionsCheck } from "@/components/security";
import { UsersListRowActions } from "@/modules/security/users/components/users-list-row-actions";
import { USERS_PERMISSIONS } from "@/modules/security/users/constants/users.permissions";
import type { User } from "@/modules/security/users/interfaces/user.interface";
import { joinText } from "@/shared/utils/text.utils";

export const usersListColumns: ColumnDef<User | undefined>[] = [
  {
    id: "email",
    accessorKey: "email",
    header: t("users:fields.email"),
  },

  {
    id: "fullName",
    header: t("users:fields.fullName"),
    cell: ({ row }) => {
      const user = row.original;

      return joinText([user?.firstName, user?.lastName]);
    },
  },

  {
    id: "role",
    header: t("users:fields.role"),
    cell: ({ row }) => {
      const user = row.original;

      return user?.role?.name;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <PermissionsCheck
          permissions={[USERS_PERMISSIONS.UPDATE, USERS_PERMISSIONS.DELETE]}
        >
          <UsersListRowActions user={user} />
        </PermissionsCheck>
      );
    },
  },
];
