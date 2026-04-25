import { z } from "zod";

const compositionsSchema = z.object({
  chemicalElementId: z.string().min(1, "errors:required"),
  percentage: z.number().min(0.01, "errors:min-001-dec"),
});

export const createMaterialGradeSchema = z.object({
  gradeCode: z.string().min(1, "errors:required"),
  baseResistance: z.number().min(0, "errors:required"),
  properties: z.record(z.string(), z.number(), "errors:required"),
  compositions: z.array(compositionsSchema),
});

export type CreateMaterialGradePayload = z.infer<
  typeof createMaterialGradeSchema
>;
