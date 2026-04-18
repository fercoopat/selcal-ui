import { CrudService } from "@/shared/services";
import type { MaterialGrade } from "@/modules/material-grades/interfaces";
import type { CreateMaterialGradePayload } from "@/modules/material-grades/schemas";

export const MaterialGradesService = new CrudService<
  MaterialGrade,
  CreateMaterialGradePayload
>("/material-grades");
