import { useState } from "react";
import { TaxiCard } from "./TaxiCard";
import TaxiRoute from "./TaxiRoute";
import { useSearchBarStore } from "@/stores/search-bar-stores/transportation-searchbar-slice";
import type { TransportationData } from "../types/home-page-types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface TransportationPageProps {
  data: TransportationData["data"];
  loggedIn: boolean;
  id?: string;
  isAdult?: boolean;
}

function TransportationPage({
  data,
  loggedIn,
  id,
  isAdult,
}: TransportationPageProps) {
  const [selectedTaxi, setSelectedTaxi] = useState<number | null>(0);

  const { selectedPickupLocation, selectedDropOffLocation } =
    useSearchBarStore();

  return (
    <div className="w-full">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Mobile Taxi List */}
        <div className="px-4 py-4 space-y-4">
          {data.map((offer, index) => {
            const { vehicle, serviceProvider, quotation } = offer;
            return (
              <Drawer key={index}>
                <DrawerTrigger asChild>
                  <div>
                    <TaxiCard
                      type={vehicle.code}
                      price={parseFloat(quotation.monetaryAmount)}
                      originalCurrency={quotation.currencyCode}
                      guests={
                        vehicle.seats ? vehicle.seats[0].count : undefined
                      }
                      luggage={
                        vehicle.baggages ? vehicle.baggages[0].count : undefined
                      }
                      provider={serviceProvider.logoUrl}
                      isSelected={selectedTaxi === index}
                      onClick={() => setSelectedTaxi(index)}
                    />
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="border-b">
                    <DrawerTitle className="text-left">
                      Trip Details
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 overflow-y-auto max-h-[calc(80vh-120px)]">
                    <TaxiRoute
                      amount={parseFloat(quotation.monetaryAmount)}
                      originalCurrency={quotation.currencyCode}
                      departure={selectedPickupLocation}
                      destination={selectedDropOffLocation}
                      serviceProvider={serviceProvider.name}
                      cancellationRule={
                        offer.cancellationRules[0].ruleDescription
                      }
                      carType={vehicle.description}
                      selectedTaxi={offer}
                      userID={id ? id : ""}
                      loggedIn={loggedIn}
                      isAdult={isAdult}
                    />
                  </div>
                </DrawerContent>
              </Drawer>
            );
          })}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full">
        <div className="w-[60%] flex flex-col p-6 xl:p-10 gap-6 xl:gap-8">
          {data.map((offer, index) => {
            const { vehicle, serviceProvider, quotation } = offer;
            return (
              <TaxiCard
                key={index}
                type={vehicle.code}
                price={parseFloat(quotation.monetaryAmount)}
                originalCurrency={quotation.currencyCode}
                guests={vehicle.seats ? vehicle.seats[0].count : undefined}
                luggage={
                  vehicle.baggages ? vehicle.baggages[0].count : undefined
                }
                provider={serviceProvider.logoUrl}
                isSelected={selectedTaxi === index}
                onClick={() => setSelectedTaxi(index)}
              />
            );
          })}
        </div>

        <div className="w-[40%] p-6 xl:p-10">
          {selectedTaxi !== null && (
            <div className="sticky top-4">
              <TaxiRoute
                amount={parseFloat(data[selectedTaxi].quotation.monetaryAmount)}
                originalCurrency={data[selectedTaxi].quotation.currencyCode}
                departure={selectedPickupLocation}
                destination={selectedDropOffLocation}
                serviceProvider={data[selectedTaxi].serviceProvider.name}
                cancellationRule={
                  data[selectedTaxi].cancellationRules[0].ruleDescription
                }
                carType={data[selectedTaxi].vehicle.description}
                selectedTaxi={data[selectedTaxi]}
                userID={id ? id : ""}
                loggedIn={loggedIn}
                isAdult={isAdult}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransportationPage;
