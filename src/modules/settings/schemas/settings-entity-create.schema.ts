import { z } from "zod";

export const createSettingsEntitySchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  sortOrder: z.number().min(0),
});

export type CreateSettingsEntityPayload = z.infer<
  typeof createSettingsEntitySchema
>;
