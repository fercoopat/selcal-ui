import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { MATERIAL_GRADES_QUERIES } from "@/modules/settings/material-grades/constants";
import { MaterialGradesService } from "@/modules/settings/material-grades/services";
import type { CreateMaterialGradePayload } from "@/modules/settings/material-grades/schemas";

export const useUpdateMaterialGrade = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<CreateMaterialGradePayload>) =>
      MaterialGradesService.update(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: MATERIAL_GRADES_QUERIES.all,
      });
      toast.success("Grado de material actualizado exitosamente");
    },
    onError: () => toast.error("Error al actualizar el grado de material"),
  });
};
