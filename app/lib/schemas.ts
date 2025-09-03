import { z } from "zod";

export const personalDataSchema = z.object({
  phone: z
    .string()
    .min(6, "Phone number must be at least 5 digits")
    .max(16, "Phone number must be at most 15 digits"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .regex(
      /^[A-Za-z\s\-']+$/,
      "First name can only contain english letters, spaces, hyphens, and apostrophes",
    ),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .regex(
      /^[A-Za-z\s\-']+$/,
      "Last name can only contain english letters, spaces, hyphens, and apostrophes",
    ),
  gender: z.string().min(1, "Gender is required"),
});

export const addressFormSchema = z.object({
  workplace: z.string().min(1, "Workplace is required"),
  address: z.string().min(1, "Residential address is required"),
});

export const loanFormSchema = z.object({
  amount: z.number().min(200).max(1000),
  term: z.number().min(10).max(30),
});
