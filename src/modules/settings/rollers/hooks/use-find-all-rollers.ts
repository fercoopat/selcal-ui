import { useQuery } from "@tanstack/react-query";

import { ROLLERS_QUERIES } from "@/modules/settings/rollers/constants/rollers.queries";
import { RollersService } from "@/modules/settings/rollers/services";

export const useFindAllRollers = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => RollersService.findAll(),
    queryKey: ROLLERS_QUERIES.findAll,
  });

  return {
    rollers: data,
    error,
    isLoading,
  };
};