import { useQuery } from "@tanstack/react-query";

import { MATERIAL_GRADES_QUERIES } from "@/modules/settings/material-grades/constants";
import { MaterialGradesService } from "@/modules/settings/material-grades/services";

export const useFindOneMaterialGrade = (id: string) =>
  useQuery({
    queryKey: MATERIAL_GRADES_QUERIES.findOne(id),
    queryFn: () => MaterialGradesService.findOne(id),
    enabled: !!id,
  });
