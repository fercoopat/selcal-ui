import z from "zod";

export const createMillTypeSchema = z.object({
  name: z.string({ error: "invalidValue" }).min(1, "required"),
  tempInitial: z.coerce.number({ error: "invalidValue" }).min(1, "min-1-num"),
  tempVariation: z.coerce.number({ error: "invalidValue" }).min(1, "min-1-num"),
});

export type CreateMillTypePayload = z.infer<typeof createMillTypeSchema>;
