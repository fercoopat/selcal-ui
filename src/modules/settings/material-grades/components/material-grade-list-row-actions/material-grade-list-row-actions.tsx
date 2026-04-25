import { InfoIcon, TrashIcon } from "lucide-react";
import { memo, useCallback } from "react";

import { IconButton } from "@/components/buttons";
import { ConfirmDialog } from "@/components/dialogs";
import { useDeleteMaterialGrade } from "@/modules/settings/material-grades/hooks";
import type { MaterialGrade } from "@/modules/settings/material-grades/interfaces";

type Props = {
  materialGrade: MaterialGrade | undefined;
};

const MaterialGradeListRowActions = ({ materialGrade }: Props) => {
  const { isPending: isLoading, mutate: deactivate } = useDeleteMaterialGrade();

  const handleDelete = useCallback(() => {
    deactivate(materialGrade?.id);
  }, [deactivate, materialGrade?.id]);

  return (
    <div className="flex items-center gap-2">
      <IconButton asChild tooltip="common:details">
        <InfoIcon />
      </IconButton>

      <ConfirmDialog
        message="materialGrades:deactivate.message"
        title="materialGrades:deactivate.title"
        onConfirm={handleDelete}
        isLoading={isLoading}
      >
        <IconButton tooltip="common:deactivate">
          <TrashIcon />
        </IconButton>
      </ConfirmDialog>
    </div>
  );
};

export default memo(MaterialGradeListRowActions);
