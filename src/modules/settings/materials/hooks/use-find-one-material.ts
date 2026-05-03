import { useQuery } from "@tanstack/react-query";

import { MATERIALS_QUERIES } from "@/modules/settings/materials/constants/materials.queries";
import { MaterialsService } from "@/modules/settings/materials/services";

export const useFindOneMaterial = (materialId: string | undefined) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => MaterialsService.findOne(materialId),
    queryKey: MATERIALS_QUERIES.findOne(materialId),
    enabled: !!materialId,
  });

  return {
    material: data,
    error,
    isLoading,
  };
};
