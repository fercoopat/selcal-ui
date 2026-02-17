import { createContext, useContext, useMemo } from "react";

import { useFindOneUser } from "@/modules/security/users/hooks/use-find-one-user";
import type { User } from "@/modules/security/users/interfaces/user.interface";

interface UserDetailsContextValue {
  error: Error | null;
  isLoading: boolean;
  user: User | undefined;
}

const UserDetailsContext = createContext<UserDetailsContextValue | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
  userId: string | undefined;
};

export const UserDetailsProvider = ({ children, userId }: Props) => {
  const { error, isLoading, user } = useFindOneUser(userId ?? null);

  const contextValue = useMemo<UserDetailsContextValue>(
    () => ({
      user,
      error,
      isLoading,
    }),
    [error, isLoading, user],
  );

  return (
    <UserDetailsContext.Provider value={contextValue}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = (): UserDetailsContextValue => {
  const context = useContext(UserDetailsContext);

  if (!context) {
    throw new Error("useUserDetails must be used within UserDetailsProvider");
  }

  return context;
};
