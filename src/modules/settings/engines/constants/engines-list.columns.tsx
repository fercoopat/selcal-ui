import type { ColumnDef } from "@tanstack/react-table";

import { PermissionsCheck } from "@/components/security";
import { EnginesListRowActions } from "@/modules/settings/engines/components/engines-list-row-actions";
import { ENGINES_PERMISSIONS } from "@/modules/settings/engines/constants/engines.permissions";
import type { Engine } from "@/modules/settings/engines/interfaces/engine.interface";

export const enginesListColumns: ColumnDef<Engine | undefined>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "engines:fields.name",
  },
  {
    id: "power",
    accessorKey: "power",
    header: "engines:fields.power",
  },
  {
    id: "speed",
    accessorKey: "speed",
    header: "engines:fields.speed",
  },
  {
    id: "transmission",
    accessorKey: "transmission",
    header: "engines:fields.transmission",
  },
  {
    id: "revMax",
    accessorKey: "revMax",
    header: "engines:fields.revMax",
  },
  {
    id: "revMin",
    accessorKey: "revMin",
    header: "engines:fields.revMin",
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
      const engine = row.original;
      return (
        <PermissionsCheck
          permissions={[
            ENGINES_PERMISSIONS.UPDATE,
            ENGINES_PERMISSIONS.DELETE,
          ]}
        >
          <EnginesListRowActions engine={engine} />
        </PermissionsCheck>
      );
    },
  },
];