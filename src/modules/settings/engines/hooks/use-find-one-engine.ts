import { useQuery } from "@tanstack/react-query";

import { ENGINES_QUERIES } from "@/modules/settings/engines/constants/engines.queries";
import { EnginesService } from "@/modules/settings/engines/services";

export const useFindOneEngine = (engineId: string | undefined) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => EnginesService.findOne(engineId),
    queryKey: ENGINES_QUERIES.findOne(engineId),
    enabled: !!engineId,
  });

  return {
    engine: data,
    error,
    isLoading,
  };
};