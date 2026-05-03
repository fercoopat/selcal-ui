import type { ColumnDef } from "@tanstack/react-table";

import { PermissionsCheck } from "@/components/security";
import { BearingsListRowActions } from "@/modules/settings/bearings/components/bearings-list-row-actions";
import { BEARINGS_PERMISSIONS } from "@/modules/settings/bearings/constants/bearings.permissions";
import type { Bearing } from "@/modules/settings/bearings/interfaces/bearing.interface";

export const bearingsListColumns: ColumnDef<Bearing | undefined>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "bearings:fields.name",
  },
  {
    id: "description",
    accessorKey: "description",
    header: "bearings:fields.description",
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
      const bearing = row.original;
      return (
        <PermissionsCheck
          permissions={[
            BEARINGS_PERMISSIONS.UPDATE,
            BEARINGS_PERMISSIONS.DELETE,
          ]}
        >
          <BearingsListRowActions bearing={bearing} />
        </PermissionsCheck>
      );
    },
  },
];
