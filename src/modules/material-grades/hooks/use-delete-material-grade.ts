import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { MATERIAL_GRADES_QUERIES } from "@/modules/material-grades/constants";
import { MaterialGradesService } from "@/modules/material-grades/services";

export const useDeleteMaterialGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => MaterialGradesService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: MATERIAL_GRADES_QUERIES.all,
      });
      toast.success("Grado de material eliminado exitosamente");
    },
    onError: () => toast.error("Error al eliminar el grado de material"),
  });
};
