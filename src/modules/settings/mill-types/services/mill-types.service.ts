import { CrudService } from "@/shared/services";
import type { SettingsEntity } from "@/modules/settings/interfaces";
import type { CreateSettingsEntityPayload } from "@/modules/settings/schemas";

export const MillTypesService = new CrudService<
  SettingsEntity,
  CreateSettingsEntityPayload
>("/mill-types");
