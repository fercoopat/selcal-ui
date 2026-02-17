import { memo } from "react";

import { useCurrentUser } from "@/modules/auth/hooks/use-current-user";
import { AUTH_PERMISSIONS } from "@/modules/auth/constants/auth-permissions";

type Props = {
  children: React.ReactNode;
  permissions: string[];
  atLeastOne?: boolean;
};
const PermissionsCheck = ({
  children,
  permissions,
  atLeastOne = false,
}: Props) => {
  const { currentUser } = useCurrentUser();

  if (!currentUser?.role?.permissions) return null;

  const userPermissions = currentUser.role.permissions;

  if (userPermissions.includes(AUTH_PERMISSIONS.ADMIN)) return <>{children}</>;

  const hasAccess = atLeastOne
    ? permissions.some((p) => userPermissions.includes(p))
    : permissions.every((p) => userPermissions.includes(p));

  return hasAccess ? <>{children}</> : null;
};
export default memo(PermissionsCheck);
