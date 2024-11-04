import { userAxiosInstance, entertainmentAxiosInstance } from "@/utils/axios-instances";
import { bookingType } from "@/utils/types";
import type { IBooking, IActivity, IUser, IItinerary, PopulatedBooking } from "@/utils/types";
import type { AxiosResponse } from "axios";

export async function populateBookings(
  bookings: IBooking[],
  filter: Partial<IBooking>,
): Promise<PopulatedBooking[]> {
  let user: AxiosResponse<IUser> | undefined;
  let entity: AxiosResponse<IActivity | IItinerary> | undefined;

  // Fetch user if filter specifies a user
  if (filter.user) {
    user = await userAxiosInstance.get<IUser>(`/users/${filter.user}`);
  }

  // Fetch entity if filter specifies an entity
  if (filter.entity) {
    const entityUrl =
      filter.type === bookingType.Activity
        ? `/activities/${filter.entity}`
        : `/itineraries/${filter.entity}`;
    entity = await entertainmentAxiosInstance.get<IActivity | IItinerary>(entityUrl);
  }

  const populatedBookings = await Promise.all(
    bookings.map(async (booking) => {
      if (booking.type === bookingType.Activity || booking.type === bookingType.Itinerary) {
        if (!filter.user) {
          user = await userAxiosInstance.get<IUser>(`/users/${booking.user}`);
        }
        if (!filter.entity) {
          const entityUrl =
            booking.type === bookingType.Activity
              ? `/activities/${booking.entity}`
              : `/itineraries/${booking.entity}`;
          entity = await entertainmentAxiosInstance.get<IActivity | IItinerary>(entityUrl);
        }
        return {
          _id: booking._id,
          user: {
            _id: user!.data._id,
            username: user!.data.username,
            email: user!.data.email,
            firstName: user!.data.firstName,
            lastName: user!.data.lastName,
            phoneNumber: user!.data.phoneNumber,
            dob: user!.data.dob,
            nationality: user!.data.nationality,
          },
          entity: entity!.data,
          type: booking.type,
          status: booking.status,
          selectedPrice: booking.selectedPrice,
          selectedDate: booking.selectedDate,
        };
      }
      return null;
    }),
  );

  // Filter out any null values from the final array
  return populatedBookings.filter((booking) => booking !== null) as PopulatedBooking[];
}
