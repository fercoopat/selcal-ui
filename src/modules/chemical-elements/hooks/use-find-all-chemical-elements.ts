import { useQuery } from "@tanstack/react-query";

import { CHEMICAL_ELEMENTS_QUERIES } from "@/modules/chemical-elements/constants";
import { ChemicalElementsService } from "@/modules/chemical-elements/services";

export const useFindAllChemicalElements = () =>
  useQuery({
    queryKey: CHEMICAL_ELEMENTS_QUERIES.findAll,
    queryFn: () => ChemicalElementsService.findAll(),
  });
