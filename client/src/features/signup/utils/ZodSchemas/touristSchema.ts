import { z } from "zod";
import { countries } from "../constants";

export const touristSchema = z
.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().regex(/^[A-Za-z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string(),
  dob: z.coerce.date().max(new Date(), "Date Of Bith cannot be in the future"),
  nationality: z.enum(Object.keys(countries) as [string, ...string[]]),
  phoneNumber: z.string().min(1, "Required"),
  job: z.enum(["Yes", "No"]).default("No"),
  jobDescription: z.string().optional(),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})
.refine((data) => data.job === "Yes" || data.jobDescription, {
  message: "Required",
  path: ["jobDescription"],
});