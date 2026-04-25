import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { MATERIAL_GRADES_QUERIES } from "@/modules/settings/material-grades/constants";
import { MaterialGradesService } from "@/modules/settings/material-grades/services";

export const useDeleteMaterialGrade = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (id: string | undefined) => MaterialGradesService.delete(id),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: MATERIAL_GRADES_QUERIES.all,
      });
      toast.success(t("materialGrades:deleteSuccess"));
    },

    onError: () => toast.error(t("materialGrades:deleteError")),
  });
};
