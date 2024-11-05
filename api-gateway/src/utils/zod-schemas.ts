import { z } from "zod";

export const RatingSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  rating: z.number(),
  review: z.string().optional(),
});
