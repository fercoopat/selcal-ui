import { z } from "zod";

export const createRollingMillSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  millTypeId: z.string().uuid(),
});

export type CreateRollingMillPayload = z.infer<typeof createRollingMillSchema>;
