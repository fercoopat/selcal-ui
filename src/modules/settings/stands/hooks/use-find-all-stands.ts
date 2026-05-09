import { useQuery } from "@tanstack/react-query";

import { STANDS_QUERIES } from "@/modules/settings/stands/constants/stands.queries";
import { StandsService } from "@/modules/settings/stands/services";

export const useFindAllStands = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => StandsService.findAll(),
    queryKey: STANDS_QUERIES.findAll,
  });

  return {
    stands: data,
    error,
    isLoading,
  };
};
