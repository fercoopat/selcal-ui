import { useQuery } from "@tanstack/react-query";

import { STANDS_QUERIES } from "@/modules/settings/stands/constants/stands.queries";
import { StandsService } from "@/modules/settings/stands/services";

export const useFindOneStand = (standId: string | undefined) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => StandsService.findOne(standId),
    queryKey: STANDS_QUERIES.findOne(standId),
    enabled: !!standId,
  });

  return {
    stand: data,
    error,
    isLoading,
  };
};
