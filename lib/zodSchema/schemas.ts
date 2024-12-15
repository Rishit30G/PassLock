import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(32, { message: "Password must be at most 32 characters long" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Password must contain at least one special character",
  });

export const signUpSchema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});

export const authFormSchema = (formType: string) => {
  return formType === "sign-up" ? signUpSchema : signInSchema;
};

export const addPasswordsSchema = z.object({
  orgName: z.string().nonempty({ message: "Organization name is required" }),
  orgUrl: z
    .string()
    .optional()
    .refine(
      (value) => !value || z.string().url().safeParse(value).success,
      { message: "Invalid URL" }
    ),
  username: z.string().optional(),
  password: z.string().nonempty({ message: "Password is required" }),
});
