import { SERVICES_URLS } from "@/lib/constants";
import { TRating } from "@/types/shared";
import { RateableEntityType } from "@/utils/enums";
import axios from "axios";

export async function createRating(rating: TRating, entityType: RateableEntityType, entityId: string) {
    const data = {
        rating,
        entityType,
        entityId
    }
    const response = await axios.post(SERVICES_URLS.RATING, data);
    return response.data;
}

