"use client";

import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Plus, Minus, Star } from "lucide-react";
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

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number | undefined;
  seller: string;
  handleAddToCart?: () => void;
}

export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  rating,
  seller,
}: ProductCardProps) {
  const userId = useParams().id;
  const { incrementCount, decrementCount } = useWishlistStore();
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (!userId) return;
    isProductWishlisted(userId, id).then(setWishlisted);
    console.log("Wishlist status", isWishlisted);
  }, [userId, id]);

  const handleWishlistClick = async () => {
    if (!id) return; // Ensure the product has a valid ID

    if (!userId) {
      alert("You must login");
      return;
    }

    if (isWishlisted) {
      try {
        await removeFromWishlist(userId, id);
        setWishlisted(false);
        decrementCount();
      } catch (error) {
        console.error("Failed to remove from wishlist", error);
      }
    } else {
      try {
        await addToWishlist(userId, id);
        setWishlisted(true);
        incrementCount();
      } catch (error) {
        console.error("Failed to add to wishlist", error);
      }
    }
  };

  const handleAddToCart = () => {
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
          <motion.button
            className="absolute top-2 right-2 z-10"
            onClick={handleWishlistClick}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={`h-6 w-6 ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-500"}`}
            />
          </motion.button>
        </div>
        <div className="p-1">
          <h3 className="font-semibold text-lg mb-0">{name}</h3>
        </div>
        <div className="text-sm text-gray-600 p-1">
          <span className="font-medium">Seller:</span> {seller}
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
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-medium">{formattedRating}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
