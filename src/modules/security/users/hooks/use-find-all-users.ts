import { useQuery } from "@tanstack/react-query";

import { USERS_QUERIES } from "@/modules/security/users/constants/users.queries";
import { UsersService } from "@/modules/security/users/services";

export const useFindAllUsers = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => UsersService.findAll(),
    queryKey: USERS_QUERIES.findAll,
  });

  return {
    users: data,
    error,
    isLoading,
  };
};

export const useFindNonAdminUsers = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => UsersService.findNonAdminUsers(),
    queryKey: USERS_QUERIES.findNonAdmins,
  });

  return {
    users: data,
    error,
    isLoading,
  };
};
