import { PlusIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { DataTableToolbar } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { CalibrationFormDialog } from "@/modules/operations/calibrations/components/calibration-form-dialog";
import { useCreateCalibrationForm } from "@/modules/operations/calibrations/hooks/use-create-calibration-form";
import { useFindOneCalibration } from "@/modules/operations/calibrations/hooks/use-find-one-calibration";

const CalibrationsListToolbar = () => {
  const { t } = useTranslation();
  const { isOpen, onToggle } = useToggle();
  const [searchParams, setSearchParams] = useSearchParams();
  const editValue = searchParams.get("edit");

  const isFormModalOpen = useMemo<boolean>(() => {
    return !!editValue || isOpen;
  }, [editValue, isOpen]);

  const onCloseEdit = useCallback(() => {
    if (!editValue) {
      onToggle();
    } else {
      searchParams.delete("edit");
      setSearchParams(searchParams);
    }
  }, [editValue, onToggle, searchParams, setSearchParams]);

  const { isLoading: isLoadingCalibrationToEdit, calibration: calibrationToEdit } =
    useFindOneCalibration(editValue || "");

  const { reset: resetForm, ...formProps } = useCreateCalibrationForm({
    calibration: calibrationToEdit,
    onSuccess: onCloseEdit,
  });

  const handleToggle = useCallback(() => {
    onCloseEdit();
    resetForm();
  }, [onCloseEdit, resetForm]);

  return (
    <>
      <DataTableToolbar>
        <Button onClick={handleToggle}>
          <PlusIcon />
          <span>{t("common:add")}</span>
        </Button>
      </DataTableToolbar>

      <CalibrationFormDialog
        {...formProps}
        reset={resetForm}
        open={isFormModalOpen}
        title={!editValue ? undefined : "calibrations:edit"}
        isLoadingCalibration={isLoadingCalibrationToEdit}
        onToggle={handleToggle}
      />
    </>
  );
};

export default CalibrationsListToolbar;
