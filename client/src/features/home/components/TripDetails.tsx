
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
import { DEFAULT_ACTIVITY_BOOKING, DEFAULT_ITINERARY_BOOKING } from '../utils/constants';
import { TRatingEntity } from './RatingForm';

export const tripRatingEntity: Record<string, TRatingEntity> = {
  rating: {
    label: "How was your overall experience?",
    description: "",
    type: "rating",
  },
  comment: {
    label: "Care to share more?",
    description: "Your feedback is important to us!",
    type: "comment",
  },
};

export function TripDetails() {
    const [searchParams] = useSearchParams();

    const userId = searchParams.get('userId');
    
    const bookingId = searchParams.get('bookingId');

    const eventId = searchParams.get('eventId');

    const type = searchParams.get('type');

    const [eventDetails, setEventDetails] = React.useState<TActivity | TItinerary | null>(null);
    const [booking, setBooking] = React.useState<TPopulatedBooking | null>(null);
    

    React.useEffect(() => {
      
        
        
        if (bookingId && bookingId !== 'null') {
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
        }else if (eventId) {
          
          if (type === 'activity') {
            fetchActivityById(eventId).then((activity) => {
              setEventDetails(activity as TActivity);
              setBooking(({...DEFAULT_ACTIVITY_BOOKING, entity: activity} as TPopulatedBooking));
            });
          } else if (type === 'itinerary') {
            fetchItineraryById(eventId).then((itinerary) => {
              setEventDetails(itinerary as TItinerary);
              setBooking(({...DEFAULT_ITINERARY_BOOKING, entity: itinerary} as TPopulatedBooking));
            });
          }


        }
        
    }, [userId, bookingId, eventId, type]);

    
  return (
    <>
      
      {
        eventDetails && (booking?.type === 'activity') && (
          <ActivityDetailsPage activity={eventDetails as TActivity} userId={userId ?? ''} initialBooking={(booking) ? booking : DEFAULT_ACTIVITY_BOOKING} />
        )
      }

      {
        eventDetails && (booking?.type === 'itinerary') && (
          <ItineraryDetailsPage  itinerary={eventDetails as TItinerary} userId={userId ?? ''} initialBooking={(booking) ? booking : DEFAULT_ITINERARY_BOOKING} />
        )
      }

    </>
  );
}