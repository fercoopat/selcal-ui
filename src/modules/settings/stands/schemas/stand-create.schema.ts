import z from "zod";

export const createStandSchema = z.object({
  position: z.coerce.number({ error: "invalidValue" }).min(1, "min-1-num"),
  isHorizontal: z.boolean({ error: "invalidValue" }),
  distanceToNextStand: z.coerce
    .number({ error: "invalidValue" })
    .min(0, "min-0-num"),
  rollingMillId: z.string({ error: "invalidValue" }).min(1, "required"),
});

export type CreateStandPayload = z.infer<typeof createStandSchema>;
