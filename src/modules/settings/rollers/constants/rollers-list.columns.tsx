import type { ColumnDef } from "@tanstack/react-table";

import { PermissionsCheck } from "@/components/security";
import { RollersListRowActions } from "@/modules/settings/rollers/components/rollers-list-row-actions";
import { ROLLERS_PERMISSIONS } from "@/modules/settings/rollers/constants/rollers.permissions";
import type { Roller } from "@/modules/settings/rollers/interfaces/roller.interface";

export const rollersListColumns: ColumnDef<Roller | undefined>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "rollers:fields.name",
  },
  {
    id: "diameter",
    accessorKey: "diameter",
    header: "rollers:fields.diameter",
  },
  {
    id: "diameterNeck",
    accessorKey: "diameterNeck",
    header: "rollers:fields.diameterNeck",
  },
  {
    id: "length",
    accessorKey: "length",
    header: "rollers:fields.length",
  },
  {
    id: "lengthNeck",
    accessorKey: "lengthNeck",
    header: "rollers:fields.lengthNeck",
  },
  {
    id: "stand",
    accessorFn: (row) => row?.stand?.position,
    header: "rollers:fields.stand",
  },
  {
    id: "material",
    accessorFn: (row) => row?.material?.name,
    header: "rollers:fields.material",
  },
  {
    id: "bearing",
    accessorFn: (row) => row?.bearing?.name,
    header: "rollers:fields.bearing",
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
      const roller = row.original;
      return (
        <PermissionsCheck
          permissions={[
            ROLLERS_PERMISSIONS.UPDATE,
            ROLLERS_PERMISSIONS.DELETE,
          ]}
        >
          <RollersListRowActions roller={roller} />
        </PermissionsCheck>
      );
    },
  },
];