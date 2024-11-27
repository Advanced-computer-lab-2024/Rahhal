import { getBookings, updateBooking } from "@/database/repositories/booking-repository";
import { bookingStatus } from "@/utils/types";

export default async function hourlyUpdate() {
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 2);
    await getBookings({ status: bookingStatus.Upcoming }).then((bookings) => {
        bookings.forEach((booking) => {
            if (booking.selectedDate! < currentDate) {
                updateBooking(booking._id.toString(), { status: bookingStatus.Completed });
            }
        });
    });
}