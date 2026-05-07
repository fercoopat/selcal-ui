import z from "zod";

import { createRollingMillSchema } from "@/modules/settings/rolling-mills/schemas/rolling-mill-create.schema";

export const updateRollingMillSchema = createRollingMillSchema.partial();

export type UpdateRollingMillPayload = z.infer<typeof updateRollingMillSchema>;
