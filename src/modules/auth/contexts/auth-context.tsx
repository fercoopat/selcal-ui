import { createContext, useCallback, useContext, useMemo } from "react";

import { useCurrentUser } from "@/modules/auth/hooks/use-current-user";
import type { User } from "@/modules/security/users/interfaces/user.interface";
import { AUTH_PERMISSIONS } from "@/modules/auth/constants/auth.permissions";

interface AuthContextValue {
  error: Error | null;
  isLoading: boolean;
  currentUser: User | undefined;
  isAuthenticated: boolean;
  userPermissions: string[];
  hasPermission: (
    requiredPermissions: string[] | undefined,
    atLeastOne?: boolean,
  ) => boolean;
  refetchUser: () => Promise<unknown>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const { currentUser, error, isLoading, refetch, isAuthenticated } =
    useCurrentUser();

  const userPermissions = useMemo(
    () => currentUser?.role?.permissions || [],
    [currentUser?.role?.permissions],
  );

  const hasPermission = useCallback(
    (
      requiredPermissions: string[] | undefined,
      atLeastOne = false,
    ): boolean => {
      if (userPermissions.includes(AUTH_PERMISSIONS.ADMIN)) {
        return true;
      }

      if (!requiredPermissions?.length) {
        return true;
      }

      if (!userPermissions.length) {
        return false;
      }

      if (atLeastOne) {
        return requiredPermissions.some((permission) =>
          userPermissions.includes(permission),
        );
      }

      return requiredPermissions.every((permission) =>
        userPermissions.includes(permission),
      );
    },
    [userPermissions],
  );

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      error,
      isLoading,
      isAuthenticated,
      userPermissions,
      hasPermission,
      refetchUser: refetch,
    }),
    [
      currentUser,
      error,
      hasPermission,
      isAuthenticated,
      isLoading,
      refetch,
      userPermissions,
    ],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
