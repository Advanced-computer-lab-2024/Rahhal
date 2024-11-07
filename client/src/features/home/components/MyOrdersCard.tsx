import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPriceValue } from "./GeneralGridView";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import imagePlaceHolder from "@/assets/imageNotavail.png";
import currencyExchange from "@/utils/currency-exchange";

interface OrderCardProps {
  date: string;
  price: number;
  itemsCount?: number;
  status?: string;
  images: string[];
  onView?: () => void;
}

export default function MyOrdersCard({
  date,
  price,
  itemsCount,
  status,
  images,
  onView = () => {},
}: OrderCardProps) {

  const { currency } = useCurrencyStore(); 
  const convertedPrice = currencyExchange("EGP", price);
  const displayPrice = convertedPrice ? convertedPrice.toFixed(0): "N/A";



  return (
    <Card className="w-full max-w-xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center" onClick={onView}>
        <div className="relative w-full sm:w-1/5 min-w-[80px] p-1">
          <Carousel className="w-full h-full rounded-lg overflow-hidden">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      onError={(e) => (e.currentTarget.src = imagePlaceHolder)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2 h-6 w-6">
              <ChevronLeft className="h-1 w-1" />
            </CarouselPrevious>
            <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6">
              <ChevronRight className="h-1 w-1" />
            </CarouselNext>
          </Carousel>
        </div>
        <div className="flex flex-1 flex-col justify-between p-2 sm:p-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">{date}</h3>
              <Button
                onClick={onView}
                className="bg-[#D4B982] hover:bg-[#C5AA73] text-black text-xs px-3 py-0.5 min-w-[60px] h-7"
              >
                View
              </Button>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <span>{currency} {displayPrice}</span>
              <span className="text-xs">•</span>
              <span>{itemsCount} items</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{status}</p>
        </div>
      </div>
    </Card>
  );
}
