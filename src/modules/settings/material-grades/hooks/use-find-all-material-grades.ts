import { useQuery } from "@tanstack/react-query";

import { MATERIAL_GRADES_QUERIES } from "@/modules/settings/material-grades/constants";
import { MaterialGradesService } from "@/modules/settings/material-grades/services";

export const useFindAllMaterialGrades = () =>{

  const {data, error, isLoading} = useQuery({
    queryKey: MATERIAL_GRADES_QUERIES.findAll,
    queryFn: () => MaterialGradesService.findAll(),
  });

  return {
    materialGrades: data,
    error,
    isLoading
  }
}
