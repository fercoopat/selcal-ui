import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { MATERIAL_GRADES_QUERIES } from "@/modules/material-grades/constants";
import { MaterialGradesService } from "@/modules/material-grades/services";
import type { CreateMaterialGradePayload } from "@/modules/material-grades/schemas";

export const useCreateMaterialGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMaterialGradePayload) =>
      MaterialGradesService.create(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: MATERIAL_GRADES_QUERIES.all,
      });
      toast.success("Grado de material creado exitosamente");
    },
    onError: () => toast.error("Error al crear el grado de material"),
  });
};
