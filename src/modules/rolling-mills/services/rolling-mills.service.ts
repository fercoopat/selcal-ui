import { CrudService } from "@/shared/services";
import type { RollingMill } from "@/modules/rolling-mills/interfaces";
import type { CreateRollingMillPayload } from "@/modules/rolling-mills/schemas";

export const RollingMillsService = new CrudService<
  RollingMill,
  CreateRollingMillPayload
>("/rolling-mills");
