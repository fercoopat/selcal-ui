import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { PASSES_QUERIES } from "@/modules/passes/constants";
import { PassesService } from "@/modules/passes/services";
import type { CreatePassPayload } from "@/modules/passes/schemas";

export const useUpdatePass = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<CreatePassPayload>) =>
      PassesService.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PASSES_QUERIES.all });
      toast.success("Pase actualizado exitosamente");
    },
    onError: () => toast.error("Error al actualizar el pase"),
  });
};
