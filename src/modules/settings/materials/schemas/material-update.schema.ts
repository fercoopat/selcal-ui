import z from "zod";

import { createMaterialSchema } from "@/modules/settings/materials/schemas/material-create.schema";

export const updateMaterialSchema = createMaterialSchema.partial();

export type UpdateMaterialPayload = z.infer<typeof updateMaterialSchema>;
