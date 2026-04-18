import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { MILL_TYPES_QUERIES } from "@/modules/settings/mill-types/constants";
import { MillTypesService } from "@/modules/settings/mill-types/services";

export const useDeleteMillType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => MillTypesService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: MILL_TYPES_QUERIES.all });
      toast.success("Tipo de laminador eliminado exitosamente");
    },
    onError: () => toast.error("Error al eliminar el tipo de laminador"),
  });
};
