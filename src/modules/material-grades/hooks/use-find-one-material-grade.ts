import { useQuery } from "@tanstack/react-query";

import { MATERIAL_GRADES_QUERIES } from "@/modules/material-grades/constants";
import { MaterialGradesService } from "@/modules/material-grades/services";

export const useFindOneMaterialGrade = (id: string) =>
  useQuery({
    queryKey: MATERIAL_GRADES_QUERIES.findOne(id),
    queryFn: () => MaterialGradesService.findOne(id),
    enabled: !!id,
  });
