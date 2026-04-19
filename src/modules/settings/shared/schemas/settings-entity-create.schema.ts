import { z } from "zod";

export const settingsEntityCreateSchema = z.object({
  name: z.string().min(1),
  sortOrder: z.number().int().min(0),
});

export type CreateSettingsEntityPayload = z.infer<typeof settingsEntityCreateSchema>;
