import type { ColumnDef } from "@tanstack/react-table";

import { PermissionsCheck } from "@/components/security";
import { CALIBRATIONS_PERMISSIONS } from "@/modules/operations/calibrations/constants/calibrations.permissions";
import type { Calibration } from "@/modules/operations/calibrations/interfaces/calibration.interface";
import { CalibrationsListRowActions } from "@/modules/operations/calibrations/components/calibrations-list-row-actions";

export const calibrationsListColumns: ColumnDef<Calibration | undefined>[] = [
  {
    id: "description",
    accessorKey: "description",
    header: "calibrations:fields.description",
  },
  {
    id: "profileType",
    accessorKey: "profileType",
    header: "calibrations:fields.profileType",
  },
  {
    id: "rollingMill",
    accessorFn: (row) => row?.rollingMill?.name,
    header: "calibrations:fields.rollingMill",
  },
  {
    id: "totalPasses",
    accessorKey: "totalPasses",
    header: "calibrations:fields.totalPasses",
  },
  {
    id: "finishingPasses",
    accessorKey: "finishingPasses",
    header: "calibrations:fields.finishingPasses",
  },
  {
    id: "initialTemp",
    accessorKey: "initialTemp",
    header: "calibrations:fields.initialTemp",
  },
  {
    id: "finalDimension",
    accessorKey: "finalDimension",
    header: "calibrations:fields.finalDimension",
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
      const calibration = row.original;
      return (
        <PermissionsCheck
          permissions={[
            CALIBRATIONS_PERMISSIONS.UPDATE,
            CALIBRATIONS_PERMISSIONS.DELETE,
          ]}
        >
          <CalibrationsListRowActions calibration={calibration} />
        </PermissionsCheck>
      );
    },
  },
];
