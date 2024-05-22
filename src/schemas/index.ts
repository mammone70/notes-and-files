import * as z from "zod";

const DEFAULT_CHAT_MESSAGE_SIZE : string = "1500";

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

export const ChatSchema = z.object({
    message: z.string()
        .min(1, {
            message: "Chat message must contain at least 1 character.",
        })
        .max(parseInt(process.env.MAX_CHAT_MESSAGE_SIZE || DEFAULT_CHAT_MESSAGE_SIZE), {
            message: `Chat message must not be longer than ${process.env.MAX_CHAT_MESSAGE_SIZE}`,
        }),
});

export const UploadFileSchema = z.object({
    title: z.string().min(1).max(200),
    files: z
      .custom<FileList>((val) => val instanceof FileList, "Required")
      .refine((files) => files.length > 0, `Required`),
  });

  export const UploadFileServerSchema = z.object({
    preview: z
      .unknown()
      .optional()
      .transform((value) => {
        return value as File | null | undefined;
      })
    //   .refine(
    //     (file) => {
    //       if (!file) {
    //         return true;
    //       }
  
    //       const fileExtension = file.name.split('.').pop();
  
    //       return !!fileExtension && validExtensions.includes(fileExtension);
    //     },
    //     { message: `Valid types: ${validExtensions}` },
    //   )
    //   .refine(
    //     (file) => {
    //       if (!file) {
    //         return true;
    //       }
  
    //       return toMb(file.size) <= MAX_FILE_SIZE_MB;
    //     },
    //     {
    //       message: `File size must be less than ${MAX_FILE_SIZE_MB}MB`,
    //     },
    //   ),
  });