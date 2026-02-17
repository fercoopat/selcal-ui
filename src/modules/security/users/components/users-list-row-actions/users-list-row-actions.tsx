import { InfoIcon, TrashIcon } from "lucide-react";
import { memo, useMemo } from "react";
import { Link } from "react-router";

import { IconButton } from "@/components/buttons";
import { ConfirmDialog } from "@/components/dialogs";
import { AUTH_PERMISSIONS } from "@/modules/auth/constants/auth-permissions";
import { USERS_PATHS } from "@/modules/security/users/constants/users-paths";
import { useDeactivateUser } from "@/modules/security/users/hooks/use-deactivate-user";
import type { User } from "@/modules/security/users/interfaces/user.interface";

type Props = {
  user: User | undefined;
};
const UsersListRowActions = ({ user }: Props) => {
  const { isLoading, deactivate } = useDeactivateUser({ user });

  const isAdmin = useMemo<boolean>(
    () => user?.role?.permissions.includes(AUTH_PERMISSIONS.ADMIN) ?? false,
    [user?.role?.permissions],
  );

  if (isAdmin) return null;

  return (
    <div className="flex items-center gap-2">
      <IconButton asChild tooltip="common:details">
        <Link to={USERS_PATHS.detailsPath(user?.id)}>
          <InfoIcon />
        </Link>
      </IconButton>

      <ConfirmDialog
        message="users:deactivate.message"
        title="users:deactivate.title"
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
export default memo(UsersListRowActions);
