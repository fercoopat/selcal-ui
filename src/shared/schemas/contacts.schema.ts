import z from "zod";

// todo: add valid phone regex
// const VALID_PHONE_REGEX =

export const emailSchema = z.email();

// export const phoneSchema = z.string().regex(VALID_PHONE_REGEX)
