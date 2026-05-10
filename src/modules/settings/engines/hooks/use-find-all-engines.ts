import { useQuery } from "@tanstack/react-query";

import { ENGINES_QUERIES } from "@/modules/settings/engines/constants/engines.queries";
import { EnginesService } from "@/modules/settings/engines/services";

export const useFindAllEngines = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => EnginesService.findAll(),
    queryKey: ENGINES_QUERIES.findAll,
  });

  return {
    engines: data,
    error,
    isLoading,
  };
};