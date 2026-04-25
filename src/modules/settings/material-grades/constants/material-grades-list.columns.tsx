import type { MaterialGrade } from "@/modules/settings/material-grades/interfaces";
import type { ColumnDef } from "@tanstack/react-table";

import { t } from "i18next";

import { PermissionsCheck } from "@/components/security";
import { MaterialGradeListRowActions } from "@/modules/settings/material-grades/components/material-grade-list-row-actions";
import { MATERIAL_GRADES_PERMISSIONS } from "@/modules/settings/material-grades/constants/material-grades.permissions";

export const materialGradesListColumns: ColumnDef<MaterialGrade | undefined>[] =
  [
    {
      id: "gradeCode",
      accessorKey: "gradeCode",
      header: t("materialGrades:fields.gradeCode"),
    },

    {
      id: "baseResistance",
      accessorKey: "baseResistance",
      header: t("materialGrades:fields.baseResistance"),
    },

    {
      id: "properties",
      header: t("materialGrades:fields.properties"),
      cell: ({ row }) => {
        const materialGrade = row.original;

        return JSON.stringify(materialGrade?.properties);
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const materialGrade = row.original;

        return (
          <PermissionsCheck
            permissions={[
              MATERIAL_GRADES_PERMISSIONS.UPDATE,
              MATERIAL_GRADES_PERMISSIONS.DELETE,
            ]}
          >
            <MaterialGradeListRowActions materialGrade={materialGrade} />
          </PermissionsCheck>
        );
      },
    },
  ];
