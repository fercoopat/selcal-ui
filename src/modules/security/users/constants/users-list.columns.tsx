import type { User } from "@/modules/security/users/interfaces/user.interface";
import type { ColumnDef } from "@tanstack/react-table";

import { PermissionsCheck } from "@/components/security";
import { UsersListRowActions } from "@/modules/security/users/components/users-list-row-actions";
import { USERS_PERMISSIONS } from "@/modules/security/users/constants/users.permissions";
import { joinText } from "@/shared/utils/text.utils";

export const usersListColumns: ColumnDef<User | undefined>[] = [
  {
    id: "email",
    accessorKey: "email",
    header: "users:fields.email",
  },

  {
    id: "fullName",
    header: "users:fields.fullName",
    cell: ({ row }) => {
      const user = row.original;

      return joinText([user?.firstName, user?.lastName]);
    },
  },

  {
    id: "role",
    header: "users:fields.role",
    cell: ({ row }) => {
      const user = row.original;

      return user?.role?.name;
    },
  },

  {
    id: "actions",
    header: "common:actions",
    enableHiding: false,
    meta: {
      headerClassName: "text-right",
      cellClassName: "text-right",
    },
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
