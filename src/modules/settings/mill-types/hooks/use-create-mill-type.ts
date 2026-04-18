import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { MILL_TYPES_QUERIES } from "@/modules/settings/mill-types/constants";
import { MillTypesService } from "@/modules/settings/mill-types/services";
import type { CreateSettingsEntityPayload } from "@/modules/settings/schemas";

export const useCreateMillType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSettingsEntityPayload) =>
      MillTypesService.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: MILL_TYPES_QUERIES.all });
      toast.success("Tipo de laminador creado exitosamente");
    },
    onError: () => toast.error("Error al crear el tipo de laminador"),
  });
};
