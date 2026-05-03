import { PlusIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { DataTableToolbar } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { BearingFormDialog } from "@/modules/settings/bearings/components/bearing-form-dialog";
import { useCreateBearingForm } from "@/modules/settings/bearings/hooks/use-create-bearing-form";
import { useFindOneBearing } from "@/modules/settings/bearings/hooks/use-find-one-bearing";

const BearingsListToolbar = () => {
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

  const { isLoading: isLoadingBearingToEdit, bearing: bearingToEdit } =
    useFindOneBearing(editValue || "");

  const { reset: resetForm, ...formProps } = useCreateBearingForm({
    bearing: bearingToEdit,
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

      <BearingFormDialog
        {...formProps}
        reset={resetForm}
        open={isFormModalOpen}
        title={!editValue ? undefined : "bearings:edit"}
        isLoadingBearing={isLoadingBearingToEdit}
        onToggle={handleToggle}
      />
    </>
  );
};

export default BearingsListToolbar;
