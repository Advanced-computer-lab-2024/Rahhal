import { STATUS_CODES } from "@/utils/constants";
import { RateableEntityType } from "@/utils/types";
import type { Request, Response } from "express";
import * as ratingService from "@/services/rating-service";
import { z } from "zod";
import { RatingSchema } from "@/utils/zod-schemas";

export async function createRating(req: Request, res: Response) {
  const RequestBodySchema = z.object({
    entityType: z.nativeEnum(RateableEntityType),
    entityId: z.string(),
    rating: RatingSchema,
  });

  const { success, error, data } = RequestBodySchema.safeParse(req.body);
  if (!success) {
    res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({ error });
    return;
  }

  const response = await ratingService.createRating(data.rating, data.entityType, data.entityId);

  res.status(response.status).send(response.data);
}
