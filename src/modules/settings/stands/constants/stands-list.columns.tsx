import type { Stand } from "@/modules/settings/stands/interfaces/stand.interface";
import type { ColumnDef } from "@tanstack/react-table";

import { PermissionsCheck } from "@/components/security";
import { StandsListRowActions } from "@/modules/settings/stands/components/stands-list-row-actions";
import { STANDS_PERMISSIONS } from "@/modules/settings/stands/constants/stands.permissions";

export const standsListColumns: ColumnDef<Stand | undefined>[] = [
  {
    id: "position",
    accessorKey: "position",
    header: "stands:fields.position",
  },

  {
    id: "isHorizontal",
    accessorFn: (row) => (row?.isHorizontal ? "Yes" : "No"),
    header: "stands:fields.isHorizontal",
  },

  {
    id: "distanceToNextStand",
    accessorKey: "distanceToNextStand",
    header: "stands:fields.distanceToNextStand",
  },

  {
    id: "rollingMill",
    accessorFn: (row) => row?.rollingMill?.name,
    header: "stands:fields.rollingMill",
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
      const stand = row.original;

      return (
        <PermissionsCheck
          permissions={[STANDS_PERMISSIONS.UPDATE, STANDS_PERMISSIONS.DELETE]}
        >
          <StandsListRowActions stand={stand} />
        </PermissionsCheck>
      );
    },
  },
];
