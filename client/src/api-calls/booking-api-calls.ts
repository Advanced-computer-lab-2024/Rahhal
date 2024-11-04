import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import type { TBookingType, IBooking } from "@/features/home/types/home-page-types";

export const fetchAllBookings = async () => {
    const response = await axios.get(SERVICES_URLS.BOOKING + `/bookings`);
    return response.data;
}

export const fetchUserBookings = async (userId: string) => {
    const response = await axios.get(SERVICES_URLS.BOOKING + `/bookings`, {
        params: {
            userId: userId,
        },
    });
    return response.data;
};

export const createBooking = async (bookingData: TBookingType) => {
    const newBooking = {
        user: bookingData.user,
        entity: bookingData.entity,
        type: bookingData.type,
    }
    const response = await axios.post(SERVICES_URLS.BOOKING + `/bookings`, newBooking);
    return response.data;
}

export const updateBookingRequest = async (id: string, bookingData: Partial<IBooking>) => {
    const response = await axios.patch(
        `${SERVICES_URLS.BOOKING}/bookings/${id}`,
        bookingData
    );
    return response.data;
};






