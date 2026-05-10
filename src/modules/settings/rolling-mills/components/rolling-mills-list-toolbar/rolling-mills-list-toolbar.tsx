import { PlusIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { DataTableToolbar } from "@/components/data-table";
import { InfoDialog } from "@/components/dialogs";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { RollingMillFormDialog } from "@/modules/settings/rolling-mills/components/rolling-mill-form-dialog";
import {
  useCreateRollingMillForm,
  useFindOneRollingMill,
} from "@/modules/settings/rolling-mills/hooks";

const RollingMillsListToolbar = () => {
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

  const {
    isLoading: isLoadingRollingMillToEdit,
    rollingMill: rollingMillToEdit,
  } = useFindOneRollingMill(editValue || "");

  const { reset: resetForm, ...formProps } = useCreateRollingMillForm({
    rollingMill: rollingMillToEdit,
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
          description="rollingMills:infoDialog.description"
          title="rollingMills:infoDialog.title"
          subtitle="rollingMills:infoDialog.subtitle"
        />
      </DataTableToolbar>

      <RollingMillFormDialog
        {...formProps}
        isLoading={isLoadingRollingMillToEdit}
        reset={resetForm}
        open={isFormModalOpen}
        onToggle={handleToggle}
        title={!editValue ? undefined : "rollingMills:edit"}
      />
    </>
  );
};

export default RollingMillsListToolbar;
