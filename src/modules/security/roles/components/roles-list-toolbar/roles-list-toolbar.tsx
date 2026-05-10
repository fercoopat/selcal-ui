import { PlusIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";

import { DataTableToolbar } from "@/components/data-table";
import { InfoDialog } from "@/components/dialogs";
import { Button } from "@/components/ui/button";
import { RoleFormDialog } from "@/modules/security/roles/components/role-form-dialog";
import { useCreateRoleForm } from "@/modules/security/roles/hooks/use-create-role-form";
import { useFindOneRole } from "@/modules/security/roles/hooks/use-find-one-role";

const RolesListToolbar = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const editValue = useMemo(() => searchParams.get("edit"), [searchParams]);

  const handleToggle = useCallback(() => {
    if (editValue) {
      searchParams.delete("edit");
      setSearchParams(searchParams);
    } else {
      setIsOpen((prev) => !prev);
    }
  }, [editValue, searchParams, setSearchParams]);

  const { isLoading: isLoadingRole, role } = useFindOneRole(editValue ?? "");

  const form = useCreateRoleForm({ role, onSuccess: handleToggle });

  return (
    <>
      <DataTableToolbar>
        <Button onClick={handleToggle}>
          <PlusIcon />

          <span>{t("roles:add")}</span>
        </Button>

        <InfoDialog
          description="roles:infoDialog.description"
          title="roles:infoDialog.title"
          subtitle="roles:infoDialog.subtitle"
        />
      </DataTableToolbar>

      <RoleFormDialog
        {...form}
        isLoading={isLoadingRole ?? form.isLoading}
        open={isOpen || !!editValue}
        onToggle={handleToggle}
      />
    </>
  );
};
export default RolesListToolbar;
