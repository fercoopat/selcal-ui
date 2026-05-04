import z from "zod";

import { createMillTypeSchema } from "@/modules/settings/mill-types/schemas/mill-type-create.schema";

export const updateMillTypeSchema = createMillTypeSchema.partial();

export type UpdateMillTypePayload = z.infer<typeof updateMillTypeSchema>;
