import { userAxiosInstance, entertainmentAxiosInstance } from "@/utils/axios-instances";
import { bookingStatus, bookingType } from "@/utils/types";
import type { IBooking, IActivity, IUser, IItinerary, PopulatedBooking } from "@/utils/types";
import type { AxiosResponse } from "axios";
import { CONSTANTS } from "@/utils/constants";

function SupportedType(type: string): boolean {
  return is3rdPartyBooking(type) || type === bookingType.Itinerary || type === bookingType.Activity;
}

function is3rdPartyBooking(type: string): boolean {
  return type === bookingType.Flight || type === bookingType.Hotel || type === bookingType.Transportation;
}

async function populateEntity(entity: string, type: string): Promise<IActivity | IItinerary | string> {
  let populatedEntity: AxiosResponse<IActivity | IItinerary> | undefined;
  if (type === bookingType.Activity)
    populatedEntity = await entertainmentAxiosInstance.get<IActivity>(`/activities/${entity}`);
  else if (type === bookingType.Itinerary)
    populatedEntity = await entertainmentAxiosInstance.get<IItinerary>(`/itineraries/${entity}`);
  else
    return entity;

  return populatedEntity.data;
}

export async function populateBooking(booking: IBooking): Promise<PopulatedBooking | null> {
  return populateBookingHelper(booking, undefined, undefined);
}

export async function populateBookings(
  bookings: IBooking[],
  filter: Partial<IBooking>,
  ownerId: string,
): Promise<PopulatedBooking[]> {
  let populatedUser: IUser | undefined;
  let populatedEntity: IActivity | IItinerary | string | undefined;

  // Fetch user if filter specifies a user
  if (filter.user) {
    populatedUser = (await userAxiosInstance.get<IUser>(`/users/${filter.user}`)).data;
  }

  // Fetch entity if filter specifies an entity
  if (filter.entity && filter.type) {
    populatedEntity = await populateEntity(filter.entity, filter.type);
  }

  const populatedBookings = await Promise.all(
    bookings.map(async (booking) => {
      return populateBookingHelper(booking, populatedUser, populatedEntity);
    }),
  );

  // Filter out any null values from the final array
  return populatedBookings.filter(
    (booking) => booking !== null && (ownerId == "" || booking.entity.owner == ownerId),
  ) as PopulatedBooking[];
}

export async function populateBookingHelper(booking: IBooking, user: IUser | undefined, entity: IActivity | IItinerary | string | undefined): Promise<PopulatedBooking | null> {

  if (!SupportedType(booking.type)) return null;

  const populatedUser = (!user) ? (await userAxiosInstance.get<IUser>(`/users/${booking.user}`)).data : user;

  const populatedEntity = (!entity) ? await populateEntity(booking.entity, booking.type) : entity;

  return {
    _id: booking._id,
    user: {
      _id: populatedUser!._id,
      username: populatedUser!.username,
      email: populatedUser!.email,
      firstName: populatedUser!.firstName,
      lastName: populatedUser!.lastName,
      phoneNumber: populatedUser!.phoneNumber,
      dob: populatedUser!.dob,
      nationality: populatedUser!.nationality,
    },
    entity: populatedEntity,
    type: booking.type,
    status: booking.status ?? bookingStatus.Upcoming,
    selectedPrice: booking.selectedPrice ?? CONSTANTS.ZERO,
    selectedDate: booking.selectedDate,
    rating: booking.rating,
    itineraryTourGuideRating: booking.itineraryTourGuideRating,
  };
}
