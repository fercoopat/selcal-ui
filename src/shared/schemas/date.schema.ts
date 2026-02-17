import z from "zod";

export const createDateSchema = (options?: {
  required?: boolean;
  message?: string;
}) => {
  const schema = z.union([
    z.date(),
    z.string().transform((str) => {
      const date = new Date(str);

      if (isNaN(date.getTime())) {
        throw new Error(options?.message || "Invalid date");
      }

      return date;
    }),
  ]);

  return schema;
};
