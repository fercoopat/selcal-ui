import { useQuery } from "@tanstack/react-query";

import { PASSES_QUERIES } from "@/modules/passes/constants";
import { PassesService } from "@/modules/passes/services";

export const useFindOnePass = (id: string) =>
  useQuery({
    queryKey: PASSES_QUERIES.findOne(id),
    queryFn: () => PassesService.findOne(id),
    enabled: !!id,
  });
