import * as z from "zod";

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum of 6 characters required.",
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    name: z.string().min(1, {
        message: "Name is required.",
    }),
});

export const UploadFileSchema = z.object({
    title: z.string().min(1).max(200),
    file: z
      .custom<FileList>((val) => val instanceof FileList, "Required")
      .refine((files) => files.length > 0, `Required`),
  });