
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { TPopulatedBooking } from '../types/home-page-types';
import { fetchActivityById } from '@/api-calls/activities-api-calls';
import { TActivity } from '@/features/advertiser/utils/advertiser-columns';
import { TItinerary } from '@/features/tour-guide/utils/tour-guide-columns';
import { fetchItineraryById } from '@/api-calls/itineraries-api-calls';
import ActivityDetailsPage from './ActivityDetails';
import ItineraryDetailsPage from './ItineraryDetails';


export function TripDetails() {
    const [searchParams] = useSearchParams();

    const userId = searchParams.get('userId');
    const eventId = searchParams.get('eventId');
    const status = searchParams.get('status');
    const bookingType = searchParams.get('bookingType');

    const [eventDetails, setEventDetails] = React.useState<TActivity | TItinerary | null>(null);

    React.useEffect(() => {
      
        if (userId && eventId && bookingType) {
          
            if (bookingType === 'activity') {
              fetchActivityById(eventId).then((activity) => {
                setEventDetails(activity as TActivity);
              });
            }
            if (bookingType === 'itinerary') {
              fetchItineraryById(eventId).then((itinerary) => {
                setEventDetails(itinerary as TItinerary);
              });
            }
        }
    }, [userId, eventId, bookingType]);

  return (
    <>
      
      {
        eventDetails && (bookingType === 'activity') && (
          <ActivityDetailsPage activity={eventDetails as TActivity} />
        )
      }

      {
        eventDetails && (bookingType === 'itinerary') && (
          <ItineraryDetailsPage  />
        )
      }

    </>
  );
}