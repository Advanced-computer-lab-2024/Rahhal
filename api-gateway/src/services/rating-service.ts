import type { TRating } from "@/utils/types";
import { RateableEntityType } from "@/utils/types";
import { addProductRating } from "@/services/product-service";
import { addActivityRating } from "@/services/entertainment-services/activities-service";
import { addItineraryRating } from "@/services/entertainment-services/itineraries-service";

export async function createRating(
  rating: TRating,
  entityType: RateableEntityType,
  rateableEntityId: string,
) {
  switch (entityType) {
    case RateableEntityType.PRODUCT:
      return await addProductRating(rateableEntityId, rating);
    case RateableEntityType.ACTIVITY:
      return await addActivityRating(rateableEntityId, rating);
    case RateableEntityType.ITINERARY:
      return await addItineraryRating(rateableEntityId, rating);
    default:
      throw new Error("Invalid entity type");
  }
}
