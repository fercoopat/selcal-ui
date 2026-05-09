import z from "zod";

import { createStandSchema } from "@/modules/settings/stands/schemas/stand-create.schema";

export const updateStandSchema = createStandSchema.partial();

export type UpdateStandPayload = z.infer<typeof updateStandSchema>;
