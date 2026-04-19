import z from "zod";

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string(),
  roleId: z.uuid(),
});

export type CreateUserPayload = z.infer<typeof createUserSchema>;
