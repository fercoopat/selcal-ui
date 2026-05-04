import type { MillType } from "@/modules/settings/mill-types/interfaces/mill-type.interface";
import type { ColumnDef } from "@tanstack/react-table";

import { PermissionsCheck } from "@/components/security";
import { MillTypesListRowActions } from "@/modules/settings/mill-types/components/mill-types-list-row-actions";
import { MILL_TYPES_PERMISSIONS } from "@/modules/settings/mill-types/constants/mill-types.permissions";

export const millTypesListColumns: ColumnDef<MillType | undefined>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "millTypes:fields.name",
  },

  {
    id: "tempInitial",
    accessorKey: "tempInitial",
    header: "millTypes:fields.tempInitial",
  },

  {
    id: "tempVariation",
    accessorKey: "tempVariation",
    header: "millTypes:fields.tempVariation",
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
      const millType = row.original;

      return (
        <PermissionsCheck
          permissions={[
            MILL_TYPES_PERMISSIONS.UPDATE,
            MILL_TYPES_PERMISSIONS.DELETE,
          ]}
        >
          <MillTypesListRowActions millType={millType} />
        </PermissionsCheck>
      );
    },
  },
];
