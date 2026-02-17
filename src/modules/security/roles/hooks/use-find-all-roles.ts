import { useQuery } from "@tanstack/react-query";

import { ROLES_QUERIES } from "@/modules/security/roles/constants/roles-queries";
import { RolesService } from "@/modules/security/roles/services";

export const useFindAllRoles = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => RolesService.findAll(),
    queryKey: ROLES_QUERIES.findAll,
  });

  return {
    roles: data,
    error,
    isLoading,
  };
};
