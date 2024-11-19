import { useEffect, useState } from "react";
import TravelPageHeader from "./TravelPageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { FlightRequest, TransferRequest } from "@/features/home/types/home-page-types";
import { getAirportCode, getTransportation } from "@/api-calls/transportation-api-calls";
import { fetchPlaceDetails } from "@/api-calls/google-maps-api-calls";
import { useSearchBarStore } from "@/stores/transportation-searchbar-slice";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api-calls/users-api-calls";
import { calculateAge } from "@/utils/age-calculator";
import TransportationPage from "./TransportationPage";
import { useParams } from "react-router-dom";
import FlightPage from "./FlightPage";
import { getFlights } from "@/api-calls/flights-search-api-calls";
import { useFlightSearchBarStore } from "@/stores/flight-searchbar-slice";
import FlightsEmptyPlaceHolder from "./flights-placeholder/FlightsEmptyPlaceHolder";
import EmptyFlightResultsPage from "./flights-placeholder/EmptyFlightResultsPage";

interface TravelPageProps {
  loggedIn: boolean;
}
function TravelPage({ loggedIn }: TravelPageProps) {
  const [isAdult, setAdult] = useState(true);
  const [transferType, setTransferType] = useState("taxis");
  const [transferRequest, setTransferRequest] = useState<TransferRequest | null>(null);
  const [flightRequest, setFlightRequest] = useState<FlightRequest | null>(null);
  const [taxiSkeleton, setTaxiSkeleton] = useState<boolean>(false);
  const [flightSkeleton, setFlightSkeleton] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  const userId = id ? id : "";
  const { data: userData } = useQuery({
    queryKey: ["fetchUser"],
    queryFn: () => getUserById(userId ? userId : ""),
    enabled: !!userId,
  });

  useEffect(() => {
    if (userData) {
      const { dob } = userData;
      if (dob) setAdult(calculateAge(dob) >= 18);
    }
  }, [userData]);

  //getting transfer data from API
  const {
    pickupLocation,
    pickupSuggestions,
    pickupSuggestionsPlaceId,
    dropOffLocation,
    dropOffSuggestions,
    dropOffSuggestionsPlaceId,
    departureTime,
    passengers,
    setSelectedPickupLocation,
    setSelectedDropOffLocation,
  } = useSearchBarStore();

  const {
    data: taxiData,
    isSuccess: isTaxisSuccess,
    isLoading: isLoadingTaxis,
    isError: isTaxisError,
    error: transportationError,
  } = useQuery({
    queryKey: ["transportation", transferRequest],
    queryFn: () => getTransportation(transferRequest as TransferRequest),
    enabled: !!transferRequest,
  });

  //getting flight data from API

  const {
    departureLocation,
    departureSuggestions,
    departureSuggestionsPlaceId,
    arrivalLocation,
    arrivalSuggestions,
    arrivalSuggestionsPlaceId,
    departureTime: flightDepartureTime,
    adults,
    children,
    infants,
  } = useFlightSearchBarStore();

  const {
    data: flightData,
    isSuccess: isFlightsSuccess,
    isLoading: isFlightsLoading,
    isError: isFLightError,
    error: flightError,
  } = useQuery({
    queryKey: ["flights", flightRequest],
    queryFn: () => getFlights(flightRequest as FlightRequest),
    enabled: !!flightRequest,
  });

  const getIATACode = async (lng: number, lat: number, location: string): Promise<string> => {
    const code = await getAirportCode(lng, lat);
    if (code && code.length > 0) return code;
    else return location.match(/\(([^)]+)\)/)?.[1] || "";
  };

  const onIconClickTaxis = async () => {
    setTaxiSkeleton(true);
    const transferRequest = await prepareTransferRequest();
    if (transferRequest) {
      setTransferRequest(transferRequest);
    }
    setSelectedPickupLocation(pickupLocation[0]);
    setSelectedDropOffLocation(dropOffLocation[0]);
  };

  const onIconClickFlights = async () => {
    setFlightSkeleton(true);
    const flightRequest = await prepareFlightRequest();
    if (flightRequest) {
      setFlightRequest(flightRequest);
    }
  };

  useEffect(() => {
    if (transportationError) {
      alert(`Error fetching transfer requests: ${transportationError.message}`);
    }
    if (flightError) {
      alert(`Error fetching flight requests: ${flightError.message}`);
    }
  }, [transportationError, flightError]);

  useEffect(() => {
    if (transferType === "taxis" && (isTaxisSuccess || isTaxisError)) {
      setTaxiSkeleton(false);
    }
  }, [isLoadingTaxis, isFlightsLoading]);

  useEffect(() => {
    if (transferType === "flights" && (isFlightsSuccess || isFLightError)) {
      setFlightSkeleton(false);
    }
  }, [isFlightsLoading, isFlightsSuccess, isFLightError]);

  const prepareTransferRequest = async () => {
    let airportCode = "";
    let start = true;
    let pickUpGeocode: { lat: number; lng: number } | undefined;
    let dropOffGeocode: { lat: number; lng: number } | undefined;
    let pickUpCountryCode: string | undefined;
    let dropOffCountryCode: string | undefined;

    // Get pickup details
    const pickUpSelectedIndex = pickupSuggestions.indexOf(pickupLocation[0]);
    const pickUpPlaceId = pickupSuggestionsPlaceId[pickUpSelectedIndex];
    const pickUpDetails = await fetchPlaceDetails(pickUpPlaceId);
    if (pickUpDetails) {
      pickUpGeocode = pickUpDetails.location;
      pickUpCountryCode = pickUpDetails.countryCode;
    }

    // Get dropoff details
    const dropOffSelectedIndex = dropOffSuggestions.indexOf(dropOffLocation[0]);
    const dropOffPlaceId = dropOffSuggestionsPlaceId[dropOffSelectedIndex];
    const dropOffDetails = await fetchPlaceDetails(dropOffPlaceId);
    if (dropOffDetails) {
      dropOffGeocode = dropOffDetails.location;
      dropOffCountryCode = dropOffDetails.countryCode;
    }

    // Determine if either location is an airport
    if (pickupLocation[0].toLowerCase().includes("airport")) {
      if (pickUpGeocode) {
        airportCode = await getIATACode(pickUpGeocode.lng, pickUpGeocode.lat, pickupLocation[0]);
      }
    } else if (dropOffLocation[0].toLowerCase().includes("airport")) {
      if (dropOffGeocode) {
        airportCode = await getIATACode(dropOffGeocode.lng, dropOffGeocode.lat, dropOffLocation[0]);
        start = airportCode.length == 0;
      }
    }
    if (airportCode.length == 0) {
      alert(
        "This service is for airport transfers, so one of your locations should be an airport.",
      );
      return;
    }

    return pickUpGeocode && dropOffGeocode
      ? start
        ? {
            startLocationCode: airportCode,
            endGeoCode: `${dropOffGeocode.lat},${dropOffGeocode.lng}`,
            endAddressLine: dropOffLocation[0],
            endCountryCode: dropOffCountryCode,
            transferType: "PRIVATE",
            startDateTime: departureTime[0].toISOString(),
            passengers: passengers,
          }
        : {
            startGeoCode: `${pickUpGeocode.lat},${pickUpGeocode.lng}`,
            startAddressLine: pickupLocation[0],
            startCountryCode: pickUpCountryCode,
            endLocationCode: airportCode,
            transferType: "PRIVATE",
            startDateTime: departureTime[0].toISOString(),
            passengers: passengers,
          }
      : null;
  };
  const prepareFlightRequest = async () => {
    let originLocationCode = "";
    let destinationLocationCode = "";

    // Get pickup details
    const departureSelectedIndex = departureSuggestions.indexOf(departureLocation[0]);
    const departurePlaceId = departureSuggestionsPlaceId[departureSelectedIndex];
    const departureDetails = await fetchPlaceDetails(departurePlaceId);

    // Get dropoff details
    const arrivalSelectedIndex = arrivalSuggestions.indexOf(arrivalLocation[0]);
    const arrivalPlaceId = arrivalSuggestionsPlaceId[arrivalSelectedIndex];
    const arrivalDetails = await fetchPlaceDetails(arrivalPlaceId);
    if (departureDetails && arrivalDetails) {
      originLocationCode = await getIATACode(
        departureDetails.location.lng,
        departureDetails.location.lat,
        departureLocation[0],
      );
      destinationLocationCode = await getIATACode(
        arrivalDetails.location.lng,
        arrivalDetails.location.lat,
        arrivalLocation[0],
      );
    }
    let travelers = [];
    let j = 0;
    for (let i = 0; i < adults[0]; i++) {
      travelers.push({ id: j.toString(), travelerType: "ADULT" });
      j++;
    }
    for (let i = 0; i < children[0]; i++) {
      travelers.push({ id: j.toString(), travelerType: "CHILD" });
      j++;
    }
    for (let i = 0; i < infants[0]; i++) {
      travelers.push({ id: j.toString(), travelerType: "SEATED_INFANT" });
      j++;
    }
    return {
      originDestinations: [
        {
          id: 1,
          originLocationCode: originLocationCode,
          destinationLocationCode: destinationLocationCode,
          departureDateTimeRange: {
            date: flightDepartureTime[0].toISOString().split("T")[0],
          },
        },
      ],
      travelers: travelers,
      sources: ["GDS"],
      searchCriteria: {
        maxFlightOffers: 20,
      },
    };
  };
  return (
    <>
      <TravelPageHeader
        transferType={transferType}
        setTransferType={setTransferType}
        onIconClickTaxis={onIconClickTaxis}
        onIconClickFlights={onIconClickFlights}
      />
      {taxiSkeleton && transferType === "taxis" && (
        <div className="space-y-2 ml-10">
          <Skeleton className="h-4 w-[400px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
      )}
      {flightSkeleton && transferType === "flights" && (
        <div className="space-y-2 ml-10">
          <Skeleton className="h-4 w-[400px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
      )}
      {!taxiSkeleton && transferType === "taxis" && taxiData?.data && (
        <TransportationPage
          data={taxiData.data}
          loggedIn={loggedIn}
          id={userId}
          isAdult={isAdult}
        />
      )}
      {!flightSkeleton &&
        transferType === "flights" &&
        (flightData ? (
          flightData.data.length == 0 ? (
            <EmptyFlightResultsPage />
          ) : (
            <FlightPage
              rawData={flightData}
              loggedIn={loggedIn}
              userId={userId}
              isAdult={isAdult}
            />
          )
        ) : (
          <FlightsEmptyPlaceHolder />
        ))}
    </>
  );
}

export default TravelPage;
