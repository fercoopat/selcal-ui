import type { Material } from "@/modules/settings/materials/interfaces/material.interface";
import type { ColumnDef } from "@tanstack/react-table";

import { PermissionsCheck } from "@/components/security";
import { MaterialsListRowActions } from "@/modules/settings/materials/components/materials-list-row-actions";
import { MATERIALS_PERMISSIONS } from "@/modules/settings/materials/constants/materials.permissions";

export const materialsListColumns: ColumnDef<Material | undefined>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "materials:fields.name",
  },

  {
    id: "description",
    accessorKey: "description",
    header: "materials:fields.description",
  },

  {
    id: "coefficient",
    accessorKey: "coefficient",
    header: "materials:fields.coefficient",
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
      const material = row.original;

      return (
        <PermissionsCheck
          permissions={[
            MATERIALS_PERMISSIONS.UPDATE,
            MATERIALS_PERMISSIONS.DELETE,
          ]}
        >
          <MaterialsListRowActions material={material} />
        </PermissionsCheck>
      );
    },
  },
];
