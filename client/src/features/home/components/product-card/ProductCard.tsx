"use client";
import { Product } from "@/features/home/types/home-page-types";
import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Plus, Minus, Star, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import currencyExchange from "@/utils/currency-exchange";
import { useParams } from "react-router-dom";
import {
  addToWishlist,
  isProductWishlisted,
  removeFromWishlist,
} from "@/api-calls/wishlist-api-calls";
import useWishlistStore from "@/stores/wishlist-count-store";
import { toast } from "@/hooks/use-toast";
import SignUpModal from "@/features/home/components/SignupModal"; // Adjust the import path as necessary
import { cn } from "@/lib/utils";
import { fetchProductById } from "@/api-calls/products-api-calls";
import { useQuery } from "@tanstack/react-query";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number | undefined;
  sellername: string;
  discount: number;
}

export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  rating,
  sellername,
  discount,
}: ProductCardProps) {
  const userId = useParams().id;
  const { incrementCount, decrementCount } = useWishlistStore();
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setWishlisted] = useState(false);
  const [isGuestAction, setIsGuestAction] = useState(false);
  const [isRatingHovered, setIsRatingHovered] = useState(false);
  const [isGuestActionCart,setIsGuestActionCart] = useState(false);

  useEffect(() => {
    if (!userId) {
      return;
    }
    isProductWishlisted(userId, id).then(setWishlisted);
  }, [userId, id]);

  const { data: product, isLoading } = useQuery({
    queryKey: ["Product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    select: (data) => data as Product,
  });

  const handleWishlistClick = async () => {
    if (!id) return; // Ensure the product has a valid ID

    if (!userId) {
      setIsGuestAction(true);

      return;
    }
    if (isWishlisted) {
      try {
        await removeFromWishlist(userId, id);
        setWishlisted(false);
        decrementCount();
      } catch (error) {
        toast({
          title: `Failed to remove from wishlist, Please try again later.`,
          variant: "destructive",
          duration: 3500,
        });
      }
    } else {
      try {
        await addToWishlist(userId, id);
        setWishlisted(true);
        incrementCount();
      } catch (error) {
        toast({
          title: `Failed to add to wishlist, Please try again later.`,
          variant: "destructive",
          duration: 3500,
        });
      }
    }
  };

  const handleAddToCart = () => {
    if (!userId) {
      setIsGuestActionCart(true);
      return;
    }

    setIsInCart(true);
    setQuantity(1);
    // TODO: Implement add to cart functionality
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity < 1) {
      setIsInCart(false);
    } else {
      setQuantity(newQuantity);
    }
    // TODO: Implement quantity update functionality
  };

  const { currency } = useCurrencyStore();
  const convertedPrice = currencyExchange("EGP", price);
  const displayPrice = convertedPrice ? convertedPrice.toFixed(0) : "N/A";

  const formattedRating = typeof rating === "number" ? rating.toFixed(1) : "N/A";

  return (
    <Card
      className="relative w-64 overflow-hidden flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 flex-grow">
        <div className="relative aspect-square">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-[12px]" />

          {isGuestAction && (
            <SignUpModal
              onClose={(e) => {
                e.stopPropagation();
                setIsGuestAction(false);
              }}
              text={"Making a list? Sign in to wishlist your favourite products"}
            />
          )}

          {isGuestActionCart && (
            <SignUpModal
              onClose={(e) => {
                e.stopPropagation();
                setIsGuestActionCart(false);
              }}
              text={"Ready to shop? Sign in to add products to your cart"}
            />
          )}

          <motion.button
            className={cn(
              "absolute top-2 right-2 z-1",
              "transition-all duration-200",
              "stroke-[1.5]",
              "stroke-gray-600",
              isWishlisted
                ? "fill-[var(--primary-color)] stroke-[var(--primary-color)]"
                : " fill-foreground/20",
            )}
            onClick={handleWishlistClick}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={cn(
                "h-6 w-6",
                "transition-all duration-200",
                "hover:scale-110 active:scale-95",
                "stroke-[1.5]",
                "stroke-white",
                isWishlisted ? "fill-red-500" : " fill-foreground/40",
              )}
            />
          </motion.button>
        </div>
        <div className="p-1 flex flex-row justify-between">
          <h3 className="font-semibold text-lg mb-0">{name}</h3>

          {/* Hoverable Rating Section */}
          <div
            className="flex items-center cursor-pointer"
            onMouseEnter={() => setIsRatingHovered(true)}
            onMouseLeave={() => setIsRatingHovered(false)}
          >
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-medium">{formattedRating}</span>
          </div>

          {/* Modal Section */}
          <AnimatePresence>
            {isRatingHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white border border-gray-300 shadow-lg rounded-md p-4 z-[1050] overflow-y-auto text-sm text-gray-700"
                onMouseEnter={() => setIsRatingHovered(true)}
                onMouseLeave={() => setIsRatingHovered(false)}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="font-semibold text-center flex-1">Ratings & Reviews</p>
                  <XIcon
                    className="cursor-pointer ml-4 w-5 h-5"
                    onClick={() => setIsRatingHovered(false)}
                  />
                </div>

                <ul className="space-y-2">
                  {product?.ratings && product.ratings.length > 0 ? (
                    product.ratings.map((rating, index) => (
                      <li key={index}>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium">{rating.rating}</span>

                          <span className="text-sm text-gray-500">- {rating.userName}</span>
                        </div>

                        <div className="text-xs text-gray-500 ml-6">{rating.review}</div>
                      </li>
                    ))
                  ) : (
                    <li>No ratings yet.</li>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-sm text-gray-600 p-1">
          <span className="font-medium">Seller:</span> {sellername}
        </div>
        <AnimatePresence>
          {isHovered && !isInCart && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent"
            >
              <Button
                className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        {isInCart && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent">
            <div className="flex justify-between items-center">
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-semibold">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start p-1 bg-gray-50">
        <div className="flex justify-between w-full mb-2">
          <span className="text-lg font-bold text-primary">
            {currency} {displayPrice}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
