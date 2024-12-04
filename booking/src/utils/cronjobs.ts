import { getBookings, updateBooking } from "@/database/repositories/booking-repository";
import { publishEventReminder } from "@/publishers/event-reminder-publisher";
import { bookingStatus } from "@/utils/types";

export async function hourlyUpdate() {
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

export async function eventReminder() {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 2);
  await getBookings({ status: bookingStatus.Upcoming, selectedDate: currentDate }).then((bookings) => {
      bookings.forEach((booking) => {
        if(booking.type == 'activity' || booking.type == 'itinerary') {
          const data = {
            entityId: booking.entity,
            userId: booking.user,
            type: booking.type,
          };
          publishEventReminder(data);
        }
      });
  });
}
    