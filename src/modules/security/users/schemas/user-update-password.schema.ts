import z from "zod";

export const updateUserPasswordSchema = z
  .object({
    currentPassword: z.string("required").min(1, "min-1-char"),

    newPassword: z.string("required").min(8, "min-8-char"),

    confirmPassword: z.string("required"),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "same-old-password",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "confirm-password",
    path: ["confirmPassword", "newPassword"],
  })
  .refine((data) => !data.newPassword.includes(" "), {
    message: "no-white-spaces",
    path: ["newPassword"],
  });

export type UpdateUserPasswordPayload = z.infer<
  typeof updateUserPasswordSchema
>;
