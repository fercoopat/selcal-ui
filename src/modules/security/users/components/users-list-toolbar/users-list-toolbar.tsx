import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { DataTableToolbar } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { UserFormDialog } from "@/modules/security/users/components/user-form-dialog";
import { useCreateUserForm } from "@/modules/security/users/hooks/use-create-user-form";

const UsersListToolbar = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const form = useCreateUserForm({ onSuccess: handleToggle });

  return (
    <>
      <DataTableToolbar>
        <Button onClick={handleToggle}>
          <PlusIcon />

          <span>{t("users:add")}</span>
        </Button>
      </DataTableToolbar>

      <UserFormDialog {...form} open={isOpen} onToggle={handleToggle} />
    </>
  );
};
export default UsersListToolbar;
