import { useQuery } from "@tanstack/react-query";

import { ROLES_QUERIES } from "@/modules/security/roles/constants/roles.queries";
import { RolesService } from "@/modules/security/roles/services";

export const useFindOneRole = (roleId: string | null) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => RolesService.findOne(roleId ?? ""),
    queryKey: ROLES_QUERIES.findOne(roleId ?? ""),
    enabled: !!roleId,
  });

  return {
    role: data,
    error,
    isLoading,
  };
};
