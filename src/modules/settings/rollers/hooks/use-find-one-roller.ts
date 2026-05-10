import { useQuery } from "@tanstack/react-query";

import { ROLLERS_QUERIES } from "@/modules/settings/rollers/constants/rollers.queries";
import { RollersService } from "@/modules/settings/rollers/services";

export const useFindOneRoller = (rollerId: string | undefined) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => RollersService.findOne(rollerId),
    queryKey: ROLLERS_QUERIES.findOne(rollerId),
    enabled: !!rollerId,
  });

  return {
    roller: data,
    error,
    isLoading,
  };
};