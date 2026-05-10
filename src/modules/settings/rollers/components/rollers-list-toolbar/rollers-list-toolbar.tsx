import { PlusIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { DataTableToolbar } from "@/components/data-table";
import { InfoDialog } from "@/components/dialogs";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { RollerFormDialog } from "@/modules/settings/rollers/components/roller-form-dialog";
import { useCreateRollerForm } from "@/modules/settings/rollers/hooks/use-create-roller-form";
import { useFindOneRoller } from "@/modules/settings/rollers/hooks/use-find-one-roller";

const RollersListToolbar = () => {
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

  const { isLoading: isLoadingRollerToEdit, roller: rollerToEdit } =
    useFindOneRoller(editValue || "");

  const { reset: resetForm, ...formProps } = useCreateRollerForm({
    roller: rollerToEdit,
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
          description="rollers:infoDialog.description"
          title="rollers:infoDialog.title"
          subtitle="rollers:infoDialog.subtitle"
        />
      </DataTableToolbar>

      <RollerFormDialog
        {...formProps}
        reset={resetForm}
        open={isFormModalOpen}
        title={!editValue ? undefined : "rollers:edit"}
        isLoadingRoller={isLoadingRollerToEdit}
        onToggle={handleToggle}
      />
    </>
  );
};

export default RollersListToolbar;