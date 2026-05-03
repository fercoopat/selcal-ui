import { PlusIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { DataTableToolbar } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { MaterialFormDialog } from "@/modules/settings/materials/components/material-form-dialog";
import { useFindOneMaterial } from "@/modules/settings/materials/hooks";
import { useCreateMaterialForm } from "@/modules/settings/materials/hooks/use-create-material-form";

const MaterialsListToolbar = () => {
  const { t } = useTranslation();

  const { isOpen, onToggle } = useToggle();
  const [searchParams, setSearchParams] = useSearchParams();

  const editValue = searchParams.get("edit");

  const isFormModalOpen = useMemo<boolean>(() => {
    return !!editValue || isOpen;
  }, [editValue, isOpen]);

  const onCloseEdit = useCallback(() => {
    if (!editValue) return;
    searchParams.delete("edit");
    setSearchParams(searchParams);
  }, [editValue, searchParams, setSearchParams]);

  const { isLoading: isLoadingMaterialToEdit, material: materialToEdit } =
    useFindOneMaterial(editValue || "");

  const { reset: resetForm, ...formProps } = useCreateMaterialForm({
    material: materialToEdit,
    onSuccess: onToggle,
  });

  const handleToggle = useCallback(() => {
    (!editValue ? onToggle : onCloseEdit)();
    resetForm();
  }, [editValue, onToggle, onCloseEdit, resetForm]);

  return (
    <>
      <DataTableToolbar>
        <Button onClick={handleToggle}>
          <PlusIcon />

          <span>{t("common:add")}</span>
        </Button>
      </DataTableToolbar>

      <MaterialFormDialog
        {...formProps}
        isLoadingMaterial={isLoadingMaterialToEdit}
        reset={resetForm}
        open={isFormModalOpen}
        onToggle={handleToggle}
        title={!editValue ? undefined : "materials:edit"}
      />
    </>
  );
};
export default MaterialsListToolbar;
