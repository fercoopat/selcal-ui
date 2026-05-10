import z from "zod";

export const createRollerSchema = z.object({
  name: z.string({ error: "invalidValue" }).min(1, "required"),
  diameter: z.coerce.number({ error: "invalidValue" }),
  diameterNeck: z.coerce.number({ error: "invalidValue" }),
  length: z.coerce.number({ error: "invalidValue" }),
  lengthNeck: z.coerce.number({ error: "invalidValue" }),
  standId: z.string({ error: "invalidValue" }).min(1, "required"),
  materialId: z.string({ error: "invalidValue" }).optional(),
  bearingId: z.string({ error: "invalidValue" }).optional(),
});

export type CreateRollerPayload = z.infer<typeof createRollerSchema>;