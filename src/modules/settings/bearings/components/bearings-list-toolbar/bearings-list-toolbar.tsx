import { PlusIcon } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { DataTableToolbar } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { BearingFormDialog } from "@/modules/settings/bearings/components/bearing-form-dialog";
import { useCreateBearingForm } from "@/modules/settings/bearings/hooks/use-create-bearing-form";

const BearingsListToolbar = () => {
  const { t } = useTranslation();
  const { isOpen, onToggle } = useToggle();
  const { reset: resetForm, ...formProps } = useCreateBearingForm({
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
          <span>{t("bearings:add")}</span>
        </Button>
      </DataTableToolbar>
      <BearingFormDialog
        {...formProps}
        reset={resetForm}
        open={isOpen}
        onToggle={handleToggle}
      />
    </>
  );
};

export default BearingsListToolbar;
