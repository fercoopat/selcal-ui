import { z } from "zod";

export const createPassSchema = z.object({
  sequenceOrder: z.number().min(1),
  inputHeight: z.number().min(0),
  outputHeight: z.number().min(0),
  calculatedForce: z.number().min(0).nullable().optional(),
  calculatedPower: z.number().min(0).nullable().optional(),
  calibrationId: z.string().uuid(),
});

export type CreatePassPayload = z.infer<typeof createPassSchema>;
