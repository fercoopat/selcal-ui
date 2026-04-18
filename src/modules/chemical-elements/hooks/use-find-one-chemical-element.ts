import { useQuery } from "@tanstack/react-query";

import { CHEMICAL_ELEMENTS_QUERIES } from "@/modules/chemical-elements/constants";
import { ChemicalElementsService } from "@/modules/chemical-elements/services";

export const useFindOneChemicalElement = (id: string) =>
  useQuery({
    queryKey: CHEMICAL_ELEMENTS_QUERIES.findOne(id),
    queryFn: () => ChemicalElementsService.findOne(id),
    enabled: !!id,
  });
