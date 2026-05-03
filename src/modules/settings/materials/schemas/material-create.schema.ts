import z from "zod";

export const createMaterialSchema = z.object({
  name: z.string({ error: "invalidValue" }).min(1, "required"),
  description: z.string({ error: "invalidValue" }).optional(),
  coefficient: z.coerce.number({ error: "invalidValue" }).min(1, "min-1-num"),
});

export type CreateMaterialPayload = z.infer<typeof createMaterialSchema>;
