import { useQuery } from "@tanstack/react-query";

import { MATERIAL_GRADES_QUERIES } from "@/modules/material-grades/constants";
import { MaterialGradesService } from "@/modules/material-grades/services";

export const useFindAllMaterialGrades = () =>
  useQuery({
    queryKey: MATERIAL_GRADES_QUERIES.findAll,
    queryFn: () => MaterialGradesService.findAll(),
  });
