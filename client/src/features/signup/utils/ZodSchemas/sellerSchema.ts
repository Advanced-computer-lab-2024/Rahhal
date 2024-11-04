import {z} from 'zod';

export const sellerSchema = z
.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().regex(/^[A-Za-z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string(),
  description: z.string().min(1, "Required"),
  nationalID: z.instanceof(File).optional().or(z.string()),
  taxRegistration: z.instanceof(File).optional().or(z.string()),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});