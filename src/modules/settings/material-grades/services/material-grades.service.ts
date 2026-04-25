import { CrudService } from "@/shared/services";
import type { MaterialGrade } from "@/modules/settings/material-grades/interfaces";
import type { CreateMaterialGradePayload } from "@/modules/settings/material-grades/schemas";

export const MaterialGradesService = new CrudService<
  MaterialGrade,
  CreateMaterialGradePayload
>("/material-grades");
