
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { TPopulatedBooking } from '../types/home-page-types';
import { fetchActivityById } from '@/api-calls/activities-api-calls';
import { TActivity } from '@/features/advertiser/utils/advertiser-columns';
import { TItinerary } from '@/features/tour-guide/utils/tour-guide-columns';
import { fetchItineraryById } from '@/api-calls/itineraries-api-calls';
import ActivityDetailsPage from './ActivityDetails';
import ItineraryDetailsPage from './ItineraryDetails';
import { fetchBookingById } from '@/api-calls/booking-api-calls';


export function TripDetails() {
    const [searchParams] = useSearchParams();

    const userId = searchParams.get('userId');
    
    const bookingId = searchParams.get('bookingId');

    const [eventDetails, setEventDetails] = React.useState<TActivity | TItinerary | null>(null);
    const [booking, setBooking] = React.useState<TPopulatedBooking | null>(null);
    

    React.useEffect(() => {
      
        
        
        if (bookingId) {
          // fetch booking details
          fetchBookingById(bookingId).then((booking) => {
            setBooking(booking);
            
            if (booking) {
              
              if (booking.type === 'activity') {

                if (booking.entity && booking.entity._id){
                  fetchActivityById(booking.entity._id).then((activity) => {
                    
                    setEventDetails(activity as TActivity);
                  });
                }

              } else {
                if (booking.entity && booking.entity._id){
                  fetchItineraryById(booking.entity._id).then((itinerary) => {
                    setEventDetails(itinerary as TItinerary);
                  });
              }
            }

          }
          });
        }
        
    }, [userId, bookingId]);

    
  return (
    <>
      
      {
        eventDetails && (booking?.type === 'activity') && (
          <ActivityDetailsPage activity={eventDetails as TActivity} userId={userId ?? ''} initialBooking={booking} />
        )
      }

      {
        eventDetails && (booking?.type === 'itinerary') && (
          <ItineraryDetailsPage  itinerary={eventDetails as TItinerary} userId={userId ?? ''} initialBooking={booking} />
        )
      }

    </>
  );
}