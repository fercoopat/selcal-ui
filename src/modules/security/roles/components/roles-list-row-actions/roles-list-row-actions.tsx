import { EditIcon, TrashIcon } from "lucide-react";
import { memo, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

import { IconButton } from "@/components/buttons";
import { ConfirmDialog } from "@/components/dialogs";
import { AUTH_PERMISSIONS } from "@/modules/auth/constants/auth.permissions";
import { useDeactivateRole } from "@/modules/security/roles/hooks/use-deactivate-role";
import type { Role } from "@/modules/security/roles/interfaces/role.interface";

type Props = {
  role: Role | undefined;
};
const RolesListRowActions = ({ role }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleEdit = useCallback(() => {
    if (!role?.id) return;
    searchParams.set("edit", role?.id);
    setSearchParams(searchParams);
  }, [role?.id, searchParams, setSearchParams]);

  const { isLoading, deactivate } = useDeactivateRole({ role });

  const isAdmin = useMemo<boolean>(
    () => role?.permissions.includes(AUTH_PERMISSIONS.ADMIN) ?? false,
    [role?.permissions],
  );

  if (isAdmin) return null;

  return (
    <div className="flex items-center gap-2">
      <IconButton tooltip="common:edit" onClick={handleEdit}>
        <EditIcon />
      </IconButton>

      <ConfirmDialog
        message="roles:deactivate.message"
        title="roles:deactivate.title"
        onConfirm={deactivate}
        isLoading={isLoading}
      >
        <IconButton tooltip="common:deactivate">
          <TrashIcon />
        </IconButton>
      </ConfirmDialog>
    </div>
  );
};
export default memo(RolesListRowActions);
