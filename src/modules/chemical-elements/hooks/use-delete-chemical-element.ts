import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { CHEMICAL_ELEMENTS_QUERIES } from "@/modules/chemical-elements/constants";
import { ChemicalElementsService } from "@/modules/chemical-elements/services";

export const useDeleteChemicalElement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ChemicalElementsService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: CHEMICAL_ELEMENTS_QUERIES.all,
      });
      toast.success("Elemento químico eliminado exitosamente");
    },
    onError: () => toast.error("Error al eliminar el elemento químico"),
  });
};
