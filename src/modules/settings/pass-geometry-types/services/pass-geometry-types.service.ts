import { CrudService } from "@/shared/services";
import type { SettingsEntity } from "@/modules/settings/interfaces";
import type { CreateSettingsEntityPayload } from "@/modules/settings/schemas";

export const PassGeometryTypesService = new CrudService<
  SettingsEntity,
  CreateSettingsEntityPayload
>("/pass-geometry-types");
