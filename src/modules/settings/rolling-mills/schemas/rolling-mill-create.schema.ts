import z from "zod";

export const createRollingMillSchema = z.object({
  name: z.string({ error: "invalidValue" }).min(1, "required"),
  distOvenStand: z.coerce.number({ error: "invalidValue" }).min(1, "min-1-num"),
  millTypeId: z.string({ error: "invalidValue" }).min(1, "required"),
});

export type CreateRollingMillPayload = z.infer<typeof createRollingMillSchema>;
