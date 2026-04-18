import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { CHEMICAL_ELEMENTS_QUERIES } from "@/modules/chemical-elements/constants";
import { ChemicalElementsService } from "@/modules/chemical-elements/services";
import type { CreateChemicalElementPayload } from "@/modules/chemical-elements/schemas";

export const useCreateChemicalElement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateChemicalElementPayload) =>
      ChemicalElementsService.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: CHEMICAL_ELEMENTS_QUERIES.all,
      });
      toast.success("Elemento químico creado exitosamente");
    },
    onError: () => toast.error("Error al crear el elemento químico"),
  });
};
