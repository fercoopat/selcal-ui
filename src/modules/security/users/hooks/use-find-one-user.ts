import { useQuery } from "@tanstack/react-query";

import { USERS_QUERIES } from "@/modules/security/users/constants/users.queries";
import { UsersService } from "@/modules/security/users/services";

export const useFindOneUser = (userId: string | null) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => UsersService.findOne(userId ?? ""),
    queryKey: USERS_QUERIES.findOne(userId ?? ""),
    enabled: !!userId,
  });

  return {
    user: data,
    error,
    isLoading,
  };
};
