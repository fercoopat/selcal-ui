import { PlusIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { DataTableToolbar } from "@/components/data-table";
import { InfoDialog } from "@/components/dialogs";
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
    if (!editValue) {
      onToggle();
    } else {
      searchParams.delete("edit");
      setSearchParams(searchParams);
    }
  }, [editValue, onToggle, searchParams, setSearchParams]);

  const { isLoading: isLoadingMaterialToEdit, material: materialToEdit } =
    useFindOneMaterial(editValue || "");

  const { reset: resetForm, ...formProps } = useCreateMaterialForm({
    material: materialToEdit,
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

        <InfoDialog
          description="materials:infoDialog.description"
          title="materials:infoDialog.title"
          subtitle="materials:infoDialog.subtitle"
        />
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
