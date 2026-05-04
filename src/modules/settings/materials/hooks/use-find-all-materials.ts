import { useQuery } from "@tanstack/react-query";

import { MATERIALS_QUERIES } from "@/modules/settings/materials/constants/materials.queries";
import { MaterialsService } from "@/modules/settings/materials/services";

export const useFindAllMaterials = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => MaterialsService.findAll(),
    queryKey: MATERIALS_QUERIES.LIST,
  });

  return {
    materials: data,
    error,
    isLoading,
  };
};
