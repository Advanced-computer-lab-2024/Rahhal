export interface PopulatedBooking {
  _id: string;
  user: IUser;
  entity: IActivity | IItinerary;
  type: bookingType;
  status: bookingStatus;
  selectedPrice: number;
  selectedDate?: Date;
}
