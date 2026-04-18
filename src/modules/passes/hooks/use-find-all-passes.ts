import { useQuery } from "@tanstack/react-query";

import { PASSES_QUERIES } from "@/modules/passes/constants";
import { PassesService } from "@/modules/passes/services";

export const useFindAllPasses = () =>
  useQuery({
    queryKey: PASSES_QUERIES.findAll,
    queryFn: () => PassesService.findAll(),
  });
