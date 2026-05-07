import type { RollingMill } from "@/modules/settings/rolling-mills/interfaces/rolling-mill.interface";
import type { ColumnDef } from "@tanstack/react-table";

import { PermissionsCheck } from "@/components/security";
import { RollingMillsListRowActions } from "@/modules/settings/rolling-mills/components/rolling-mills-list-row-actions";
import { ROLLING_MILLS_PERMISSIONS } from "@/modules/settings/rolling-mills/constants/rolling-mills.permissions";

export const rollingMillsListColumns: ColumnDef<RollingMill | undefined>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "rollingMills:fields.name",
  },

  {
    id: "distOvenStand",
    accessorKey: "distOvenStand",
    header: "rollingMills:fields.distOvenStand",
  },

  {
    id: "millType",
    accessorFn: (row) => row?.millType?.name,
    header: "rollingMills:fields.millType",
  },

  {
    id: "actions",
    enableHiding: false,
    header: "common:actions",
    meta: {
      headerClassName: "text-right",
      cellClassName: "text-right",
    },
    cell: ({ row }) => {
      const rollingMill = row.original;

      return (
        <PermissionsCheck
          permissions={[
            ROLLING_MILLS_PERMISSIONS.UPDATE,
            ROLLING_MILLS_PERMISSIONS.DELETE,
          ]}
        >
          <RollingMillsListRowActions rollingMill={rollingMill} />
        </PermissionsCheck>
      );
    },
  },
];
