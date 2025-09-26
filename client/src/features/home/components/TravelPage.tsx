import { useEffect, useState } from "react";
import TravelPageHeader from "./TravelPageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FlightRequest,
  TransferRequest,
} from "@/features/home/types/home-page-types";
import {
  getAirportCode,
  getTransportation,
} from "@/api-calls/transportation-api-calls";
import { fetchPlaceDetails } from "@/api-calls/google-maps-api-calls";
import { useSearchBarStore } from "@/stores/search-bar-stores/transportation-searchbar-slice";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api-calls/users-api-calls";
import { calculateAge } from "@/utils/age-calculator";
import TransportationPage from "./TransportationPage";
import FlightPage from "./FlightPage";
import { getFlights } from "@/api-calls/flights-search-api-calls";
import { useFlightSearchBarStore } from "@/stores/search-bar-stores/flight-searchbar-slice";
import FlightsLandingComponent from "./flights-placeholder/FlightsLandingComponent";
import EmptyFlightResultsPage from "./flights-placeholder/EmptyFlightResultsPage";
import TaxiLandingPage from "./taxi-placeholder/TaxiLandingPage";
import bus from "@/assets/bus.png";
import { Button } from "@/components/ui/button";
import { PiTaxi } from "react-icons/pi";
import flightIcon from "@/assets/flight-Icon.png";
import busIcon from "@/assets/Bus Icon.png";
import { toast } from "@/hooks/use-toast";
import { useTour } from "@/components/AppTour";

import useUserStore from "@/stores/user-state-store";
import EmptyTaxiResultsPage from "./taxi-placeholder/EmptyTaxiResultsPage";

function TravelPage() {
  const [isAdult, setAdult] = useState(true);
  const [transferType, setTransferType] = useState("taxis");
  const [transferRequest, setTransferRequest] =
    useState<TransferRequest | null>(null);
  const [flightRequest, setFlightRequest] = useState<FlightRequest | null>(
    null
  );
  const [taxiSkeleton, setTaxiSkeleton] = useState<boolean>(false);
  const [flightSkeleton, setFlightSkeleton] = useState<boolean>(false);
  const [autoSearchTour, setAutoSearchTour] = useState<boolean>(false);
  const { toggleLoading, isLoadingTour, setIsLoading } = useTour();

  // const { id } = useParams<{ id: string }>();
  const { id } = useUserStore();
  const userId = id ? id : "";
  const loggedIn = userId ? true : false;
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
    setPickupLocation,
    setDropOffLocation,
    setDepartureTime,
    setPassengers,
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

  const getIATACode = async (
    lng: number,
    lat: number,
    location: string
  ): Promise<string> => {
    const code = await getAirportCode(lng, lat);
    if (code && code.length > 0) return code;
    else return location.match(/\(([^)]+)\)/)?.[1] || "";
  };

  const onIconClickTaxis = async () => {
    console.log("Manual", pickupLocation);
    if (!pickupLocation.length) {
      toast({
        title: "Please specify the pickup location",
        variant: "destructive",
        duration: 3500,
      });
      return;
    }
    if (!dropOffLocation.length) {
      toast({
        title: "Please specify the drop-off location",
        variant: "destructive",
        duration: 3500,
      });
      return;
    }
    if (!departureTime.length) {
      toast({
        title: "Please specify the departure time",
        variant: "destructive",
        duration: 3500,
      });
      return;
    }
    if (passengers === 0) {
      toast({
        title: "Please specify the number of passengers",
        variant: "destructive",
        duration: 3500,
      });
      return;
    }
    setTaxiSkeleton(true);
    const transferRequest = await prepareTransferRequest();
    if (transferRequest) {
      setTransferRequest(transferRequest);
    }
    setSelectedPickupLocation(pickupLocation[0]);
    setSelectedDropOffLocation(dropOffLocation[0]);
  };

  const onIconClickFlights = async () => {
    if (!departureLocation.length) {
      toast({
        title: "Please specify the departure location",
        variant: "destructive",
        duration: 3500,
      });
      return;
    }
    if (!flightDepartureTime.length) {
      toast({
        title: "Please specify the departure time",
        variant: "destructive",
        duration: 3500,
      });
      return;
    }
    if (adults[0] + children[0] + infants[0] === 0) {
      toast({
        title: "Please specify the number of passengers",
        variant: "destructive",
        duration: 3500,
      });
      return;
    }

    setFlightSkeleton(true);
    const flightRequest = await prepareFlightRequest();
    if (flightRequest) {
      setFlightRequest(flightRequest);
    }
  };

  const setupTourTaxiSearch = async () => {
    setAutoSearchTour(true);

    // Set state values
    setPickupLocation("Cairo International Airport (CAI), El Nozha, Egypt");
    setDropOffLocation("Banafseg 5, New Cairo 1, Egypt");
    const tourDepartureTime = new Date("2024-12-31T00:00:00+02:00");
    setDepartureTime(tourDepartureTime);
    setPassengers(2);
  };

  useEffect(() => {
    if (
      autoSearchTour &&
      pickupLocation.length > 0 &&
      dropOffLocation.length > 0 &&
      departureTime &&
      passengers > 0
    ) {
      onIconClickTaxis();
    }
  }, [
    pickupLocation,
    dropOffLocation,
    departureTime,
    passengers,
    autoSearchTour,
  ]);

  // Expose global function for tour
  useEffect(() => {
    (window as any).tourTaxiSearch = setupTourTaxiSearch;
    return () => {
      delete (window as any).tourTaxiSearch;
    };
  }, [
    setAutoSearchTour,
    autoSearchTour,
    pickupLocation,
    dropOffLocation,
    departureTime,
    passengers,
  ]);

  useEffect(() => {
    if (transportationError) {
      console.error(
        `Error fetching transportation: ${transportationError.message}`
      );
      alert(
        "Unfortunately, we could not find transportation for your request. Please try other dates, timings, or destinations"
      );
    }
    if (flightError) {
      console.error(`Error fetching flight: ${flightError.message}`);
      alert(
        "Unfortunately, we could not find flights for your request. Please try other dates, timings or destinations"
      );
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

  useEffect(() => {
    console.log("Travel loading before toggle in useEffect", taxiSkeleton);
    console.log("tour loading before toggle in useEffect", isLoadingTour);

    toggleLoading(); // Correctly calling the toggle function
    console.log("Travel loading before after in useEffect", taxiSkeleton);
    console.log("tour loading after toggle in useEffect", isLoadingTour);
  }, [toggleLoading, taxiSkeleton]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const prepareTransferRequest = async () => {
    let airportCode = "";
    let start = true;
    let pickUpGeocode: { lat: number; lng: number } | undefined;
    let dropOffGeocode: { lat: number; lng: number } | undefined;
    let pickUpCountryCode: string | undefined;
    let dropOffCountryCode: string | undefined;

    console.log("pickupLocation[0]", pickupLocation[0]);

    console.log("pickupSuggestions", pickupSuggestions);

    let pickUpPlaceId: string;
    let dropOffPlaceId: string;
    if (autoSearchTour) {
      pickUpPlaceId = "ChIJQU-oLggXWBQRhhPiUSGvZeA";
      dropOffPlaceId = "ChIJOxGgaoQZWBQRkGnseVrnH5s";
    } else {
      console.log("enteredElse");
      console.log("tour?: ", autoSearchTour);

      const pickUpSelectedIndex = pickupSuggestions.indexOf(pickupLocation[0]);
      pickUpPlaceId = pickupSuggestionsPlaceId[pickUpSelectedIndex];
      const dropOffSelectedIndex = dropOffSuggestions.indexOf(
        dropOffLocation[0]
      );
      dropOffPlaceId = dropOffSuggestionsPlaceId[dropOffSelectedIndex];
    }
    setAutoSearchTour(false);
    // Get pickup details
    const pickUpDetails = await fetchPlaceDetails(pickUpPlaceId);
    console.log("pickUpDetails", pickUpDetails);
    if (pickUpDetails) {
      pickUpGeocode = pickUpDetails.location;
      pickUpCountryCode = pickUpDetails.countryCode;
    }
    // Get dropoff details
    const dropOffDetails = await fetchPlaceDetails(dropOffPlaceId);
    if (dropOffDetails) {
      dropOffGeocode = dropOffDetails.location;
      dropOffCountryCode = dropOffDetails.countryCode;
    }

    // Determine if either location is an airport
    if (pickupLocation[0].toLowerCase().includes("airport")) {
      if (pickUpGeocode) {
        airportCode = await getIATACode(
          pickUpGeocode.lng,
          pickUpGeocode.lat,
          pickupLocation[0]
        );
      }
    } else if (dropOffLocation[0].toLowerCase().includes("airport")) {
      if (dropOffGeocode) {
        airportCode = await getIATACode(
          dropOffGeocode.lng,
          dropOffGeocode.lat,
          dropOffLocation[0]
        );
        start = airportCode.length == 0;
      }
    }
    if (airportCode.length == 0) {
      alert(
        "This service is for airport transfers, so one of your locations should be an airport."
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
    let originLocationCode =
      departureLocation[0].match(/\(([^)]+)\)/)?.[1] || "";
    let destinationLocationCode =
      arrivalLocation[0].match(/\(([^)]+)\)/)?.[1] || "";

    if (!originLocationCode || !destinationLocationCode) {
      toast({
        title: "Invalid airport codes",
        description: "Please select valid airports with IATA codes",
        variant: "destructive",
        duration: 3500,
      });
      return null;
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
    <div className="min-h-screen bg-gray-50" id="travel-page-tour">
      <div id="travel-searchBar-tour">
        <TravelPageHeader
          transferType={transferType}
          setTransferType={setTransferType}
          onIconClickTaxis={onIconClickTaxis}
          onIconClickFlights={onIconClickFlights}
        />
      </div>
      {/* Mobile Transport Type Buttons */}
      <div className="block lg:hidden px-4 py-4" id="travel-content-tour-mobile">
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            className={`rounded-full bg-transparent text-black hover:bg-gray-200 px-4 py-2 text-sm flex items-center ${transferType === "taxis" && "bg-gray-200"} `}
            onClick={() => setTransferType("taxis")}
          >
            <PiTaxi className="mr-1" size={16} />
            <span className="hidden sm:inline">Airport taxis</span>
            <span className="sm:hidden">Taxis</span>
          </Button>
          <Button
            className={`rounded-full bg-transparent text-black hover:bg-gray-200 px-4 py-2 text-sm flex items-center ${transferType === "flights" && "bg-gray-200"} `}
            onClick={() => setTransferType("flights")}
          >
            <img src={flightIcon} className="mr-1 w-5 h-5" />
            Flights
          </Button>
          <Button
            className={`rounded-full bg-transparent text-black hover:bg-gray-200 px-4 py-2 text-sm flex items-center ${transferType === "buses" && "bg-gray-200"} `}
            onClick={() => setTransferType("buses")}
          >
            <img src={busIcon} className="mr-1 w-5 h-5" />
            Buses
          </Button>
        </div>
      </div>

      {/* Desktop Transport Type Buttons */}
      <div className="hidden lg:flex justify-end px-16 py-[1%]" id="travel-content-tour-desktop">
        <Button
          className={`ml-2 rounded-full bg-transparent text-black hover:bg-gray-200 px-6 py-3 text-md ${transferType === "taxis" && "bg-gray-200"} `}
          onClick={() => setTransferType("taxis")}
        >
          <PiTaxi className="mr-2" size={20} />
          Airport taxis
        </Button>
        <Button
          className={`ml-2 rounded-full bg-transparent text-black hover:bg-gray-200 px-6 py-3 text-md ${transferType === "flights" && "bg-gray-200"} `}
          onClick={() => setTransferType("flights")}
        >
          <img src={flightIcon} className="mr-2 w-7 h-7" />
          Flights
        </Button>
        <Button
          className={`ml-2 rounded-full bg-transparent text-black  hover:bg-gray-200 px-6 py-3 text-md  ${transferType === "buses" && "bg-gray-200"} `}
          onClick={() => setTransferType("buses")}
        >
          <img src={busIcon} className="mr-2 w-7 h-7" />
          Buses
        </Button>
      </div>

      {transferType === "buses" && (
        <div className="flex flex-col items-center justify-center bg-white p-4 md:p-8">
          <img
            src={bus}
            alt="Bus illustration"
            className="w-48 md:w-64 lg:w-80 h-auto object-contain mb-6"
          />
          <p className="text-base md:text-lg text-gray-700 text-center mb-2 px-4">
            Plan your next trip with ease. <br />
            Bus booking with flexible timings and destinations is
          </p>
          <p className="text-xl md:text-2xl font-bold text-center text-black">
            coming soon!
          </p>
        </div>
      )}

      {taxiSkeleton && transferType === "taxis" && (
        <div className="space-y-2 px-4 md:px-8 lg:px-10">
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-full max-w-sm" />
        </div>
      )}
      {flightSkeleton && transferType === "flights" && (
        <div className="space-y-2 px-4 md:px-8 lg:px-10">
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-full max-w-sm" />
        </div>
      )}
      {!taxiSkeleton &&
        transferType === "taxis" &&
        (taxiData ? (
          taxiData.data.length == 0 ? (
            <EmptyTaxiResultsPage />
          ) : (
            <TransportationPage
              data={taxiData.data}
              loggedIn={loggedIn}
              id={userId}
              isAdult={isAdult}
            />
          )
        ) : (
          <TaxiLandingPage />
        ))}
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
          <FlightsLandingComponent />
        ))}
    </div>
  );
}

export default TravelPage;
