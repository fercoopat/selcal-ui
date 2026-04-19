import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { MILL_TYPES_QUERIES } from "@/modules/settings/mill-types/constants";
import { MillTypesService } from "@/modules/settings/mill-types/services";
import type { CreateSettingsEntityPayload } from "@/modules/settings/shared/schemas";

export const useUpdateMillType = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<CreateSettingsEntityPayload>) =>
      MillTypesService.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: MILL_TYPES_QUERIES.all });
      toast.success("Tipo de laminador actualizado exitosamente");
    },
    onError: () => toast.error("Error al actualizar el tipo de laminador"),
  });
};
