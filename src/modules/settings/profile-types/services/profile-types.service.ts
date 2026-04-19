import { CrudService } from "@/shared/services";
import type { SettingsEntity } from "@/modules/settings/interfaces";
import type { CreateSettingsEntityPayload } from "@/modules/settings/shared/schemas";

export const ProfileTypesService = new CrudService<
  SettingsEntity,
  CreateSettingsEntityPayload
>("/profile-types");
