import { PlusIcon } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { DataTableToolbar } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { MaterialGradeFormDialog } from "@/modules/settings/material-grades/components/material-grade-form-dialog";
import { useCreateMaterialGrade } from "@/modules/settings/material-grades/hooks";

const MaterialGradesListToolbar = () => {
  const { t } = useTranslation();

  const { isOpen, onToggle } = useToggle();

  const { reset: resetForm, ...formProps } = useCreateMaterialGrade({
    onSuccess: onToggle,
  });

  const handleToggle = useCallback(() => {
    onToggle();
    resetForm();
  }, [onToggle, resetForm]);

  return (
    <>
      <DataTableToolbar>
        <Button onClick={handleToggle}>
          <PlusIcon />

          <span>{t("materialGrades:add")}</span>
        </Button>
      </DataTableToolbar>

      <MaterialGradeFormDialog
        {...formProps}
        reset={resetForm}
        open={isOpen}
        onToggle={handleToggle}
      />
    </>
  );
};

export default MaterialGradesListToolbar;
