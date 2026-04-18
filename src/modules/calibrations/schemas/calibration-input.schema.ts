import { z } from "zod";

const billetSchema = z.object({
  height: z.number().min(0),
  width: z.number().min(0),
  temperature: z.number().min(0),
  material: z.string().min(1),
  area: z.number().min(0),
});

const targetDimensionsSchema = z.object({
  diameter: z.number().min(0).optional(),
  side: z.number().min(0).optional(),
  flatDistance: z.number().min(0).optional(),
});

const targetSchema = z.object({
  type: z.string().min(1),
  dimensions: targetDimensionsSchema,
  temperature: z.number().min(0),
});

export const calibrationInputSchema = z.object({
  billet: billetSchema,
  target: targetSchema,
  maxElongation: z.number().min(1).max(2),
});

export type CalibrationInputPayload = z.infer<typeof calibrationInputSchema>;
