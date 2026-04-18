import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { PASSES_QUERIES } from "@/modules/passes/constants";
import { PassesService } from "@/modules/passes/services";

export const useDeletePass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => PassesService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PASSES_QUERIES.all });
      toast.success("Pase eliminado exitosamente");
    },
    onError: () => toast.error("Error al eliminar el pase"),
  });
};
