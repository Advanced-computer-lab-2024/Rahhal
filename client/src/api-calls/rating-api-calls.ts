import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import {RateableEntityType} from "@/utils/enums";
import{TRating} from "@/features/home/types/home-page-types"


export async function createRating(rating: TRating, entityType: RateableEntityType, entityId: string) {
    const data = {
        rating,
        entityType,
        entityId
    }
    const response = await axios.post(SERVICES_URLS.RATING, data);
    return response.data;
}


