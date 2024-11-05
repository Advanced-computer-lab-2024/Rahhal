import { useEffect, useState } from "react";
import TravelPageHeader from "./TravelPageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { TransferRequest } from "@/features/home/types/home-page-types";
import { getAirportCode, getTransportation } from "@/api-calls/transportation-api-calls";
import { fetchPlaceDetails } from "@/api-calls/google-maps-api-calls";
import { useSearchBarStore } from "@/stores/transportation-searchbar-slice";
import { useQuery } from "@tanstack/react-query";
import TransportationPage from "./TransportationPage";

interface TravelPageProps {
  loggedIn: boolean;
}
function TravelPage({ loggedIn }: TravelPageProps) {
  const [transferType, setTransferType] = useState("taxis");
  const [transferRequest, setTransferRequest] = useState<TransferRequest | null>(null);
  const [skeleton, setSkeleton] = useState<boolean>(false);

  const {
    pickupLocation,
    pickupSuggestions,
    pickupSuggestionsPlaceId,
    dropOffLocation,
    dropOffSuggestions,
    dropOffSuggestionsPlaceId,
    departureTime,
    passengers,
  } = useSearchBarStore();

  const {
    data: taxiData,
    isLoading: isTaxisLoading,
    error: transportationError,
  } = useQuery({
    queryKey: ["transportation", transferRequest],
    queryFn: () => getTransportation(transferRequest as TransferRequest),
    enabled: !!transferRequest,
  });

  const onIconClickTaxis = async () => {
    setSkeleton(true);
    const transferRequest = await prepareTransferRequest();
    if (transferRequest) {
      setTransferRequest(transferRequest);
    }
  };

  useEffect(() => {
    if (transportationError) {
      alert(`Something went wrong: ${transportationError.message}`);
    }
  }, [transportationError]);
  useEffect(() => {
    if (!isTaxisLoading && taxiData) {
      setSkeleton(false);
    }
  }, [isTaxisLoading]);

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
        const code = await getAirportCode(pickUpGeocode.lng, pickUpGeocode.lat);
        if (code && code.length > 0) airportCode = code;
        else airportCode = pickupLocation[0].match(/\(([^)]+)\)/)?.[1] || "";
      }
    } else if (dropOffLocation[0].toLowerCase().includes("airport")) {
      if (dropOffGeocode) {
        const code = await getAirportCode(dropOffGeocode.lng, dropOffGeocode.lat);
        if (code && code.length > 0) {
          airportCode = code;
          start = false;
        } else airportCode = pickupLocation[0].match(/\(([^)]+)\)/)?.[1] || "";
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
  return (
    <>
      <TravelPageHeader
        transferType={transferType}
        setTransferType={setTransferType}
        onIconClickTaxis={onIconClickTaxis}
      />
      {skeleton && (
        <div className="space-y-2 ml-10">
          <Skeleton className="h-4 w-[400px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
      )}
      {!skeleton && transferType === "taxis" && taxiData?.data && (
        <TransportationPage data={taxiData.data} loggedIn={loggedIn} />
      )}
    </>
  );
}

export default TravelPage;
