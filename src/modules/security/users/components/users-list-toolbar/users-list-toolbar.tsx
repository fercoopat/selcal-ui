import { PlusIcon } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { DataTableToolbar } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { useToggle } from "@/hooks/use-toggle";
import { UserFormDialog } from "@/modules/security/users/components/user-form-dialog";
import { useCreateUserForm } from "@/modules/security/users/hooks/use-create-user-form";

const UsersListToolbar = () => {
  const { t } = useTranslation();

  const { isOpen, onToggle } = useToggle();

  const { reset: resetForm, ...formProps } = useCreateUserForm({
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

          <span>{t("users:add")}</span>
        </Button>
      </DataTableToolbar>

      <UserFormDialog
        {...formProps}
        reset={resetForm}
        open={isOpen}
        onToggle={handleToggle}
      />
    </>
  );
};
export default UsersListToolbar;
