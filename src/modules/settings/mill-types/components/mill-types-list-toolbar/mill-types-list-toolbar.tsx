import { PlusIcon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { DataTableToolbar } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { MillTypeFormDialog } from "@/modules/settings/mill-types/components/mill-type-form-dialog";
import {
  useCreateMillTypeForm,
  useFindOneMillType,
} from "@/modules/settings/mill-types/hooks";

const MillTypesListToolbar = () => {
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

  const { isLoading: isLoadingMillTypeToEdit, millType: millTypeToEdit } =
    useFindOneMillType(editValue || "");

  const { reset: resetForm, ...formProps } = useCreateMillTypeForm({
    millType: millTypeToEdit,
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

      <MillTypeFormDialog
        {...formProps}
        isLoadingMillType={isLoadingMillTypeToEdit}
        reset={resetForm}
        open={isFormModalOpen}
        onToggle={handleToggle}
        title={!editValue ? undefined : "millTypes:edit"}
      />
    </>
  );
};
export default MillTypesListToolbar;
