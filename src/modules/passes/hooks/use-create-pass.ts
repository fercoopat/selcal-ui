import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { PASSES_QUERIES } from "@/modules/passes/constants";
import { PassesService } from "@/modules/passes/services";
import type { CreatePassPayload } from "@/modules/passes/schemas";

export const useCreatePass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePassPayload) => PassesService.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PASSES_QUERIES.all });
      toast.success("Pase creado exitosamente");
    },
    onError: () => toast.error("Error al crear el pase"),
  });
};
