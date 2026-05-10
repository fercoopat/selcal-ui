import z from "zod";

export const createEngineSchema = z.object({
  name: z.string({ error: "invalidValue" }).min(1, "required"),
  power: z.coerce.number({ error: "invalidValue" }),
  speed: z.coerce.number({ error: "invalidValue" }),
  transmission: z.coerce.number({ error: "invalidValue" }),
  revMax: z.coerce.number({ error: "invalidValue" }),
  revMin: z.coerce.number({ error: "invalidValue" }),
  standId: z.string({ error: "invalidValue" }).optional(),
});

export type CreateEnginePayload = z.infer<typeof createEngineSchema>;