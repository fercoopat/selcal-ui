import { z } from "zod";

export const createMaterialGradeSchema = z.object({
  gradeCode: z.string().min(1),
  baseResistance: z.number().min(0),
  properties: z.record(z.string(), z.number()),
});

export type CreateMaterialGradePayload = z.infer<
  typeof createMaterialGradeSchema
>;
