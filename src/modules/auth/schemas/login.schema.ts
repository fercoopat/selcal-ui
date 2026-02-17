import { z } from "zod";

import { emailSchema } from "@/shared/schemas/contacts.schema";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string(),
});

export type LoginPayload = z.infer<typeof loginSchema>;
