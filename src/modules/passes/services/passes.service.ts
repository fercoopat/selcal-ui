import { CrudService } from "@/shared/services";
import type { Pass } from "@/modules/passes/interfaces";
import type { CreatePassPayload } from "@/modules/passes/schemas";

export const PassesService = new CrudService<Pass, CreatePassPayload>("/passes");
