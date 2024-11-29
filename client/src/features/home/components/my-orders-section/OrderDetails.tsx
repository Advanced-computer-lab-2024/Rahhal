import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TOrder, TRating } from "@/features/home/types/home-page-types";
import { formatOrderDate } from "./MyOrdersPage";
import { Star } from "lucide-react";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip"; // Use your tooltip component
import { TooltipProvider, TooltipContent } from "@/components/ui/tooltip";
import RatingForm from "@/features/home/components/RatingForm";
import { createRating } from "@/api-calls/rating-api-calls";
import { cancelOrder, rateProduct } from "@/api-calls/order-api-calls";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { getUserById, refundMoney } from "@/api-calls/users-api-calls";
import { RateableEntityType, OrderStatus } from "@/utils/enums";
import { useQuery } from "@tanstack/react-query";
import OrdersPageStyles from "@/features/home/styles/MyOrdersPage.module.css";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import currencyExchange from "@/utils/currency-exchange";
interface OrderDetailsProps {
  order: TOrder; // Use the TOrder type
  onClose: () => void;
  onUpdateOrder: (updatedOrder: TOrder) => void;
}

export function OrderDetails({ order, onClose, onUpdateOrder }: OrderDetailsProps) {
  const [showRating, setShowRating] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(order);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setCurrentOrder(order);
  }, [order]);

  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id,
  });

  const handleShowCancelModal = () => {
    setShowCancelModal(true);
  };

  const handleCancelOrder = async () => {
    try {
      const orderData = {
        orderStatus: OrderStatus.cancelled,
      };
      const updatedOrder = await cancelOrder(order._id as string, orderData);
      if (id && (order.paymentMethod === "credit" || order.paymentMethod === "wallet")) {
        await refundMoney(id, order.totalPrice);
      }
      setCurrentOrder(updatedOrder as TOrder);
      onUpdateOrder(updatedOrder as TOrder);
    } catch (error) {
      toast({
        title: `Failed to cancel order, please try again later`,
        variant: "destructive",
        duration: 3500,
      });
    }

    setShowCancelModal(false);
  };
  const handelCloseCancelOrder = () => {
    setShowCancelModal(false);
  };

  const handleShowRating = (productId: string) => {
    setSelectedProductId(productId);
    setShowRating(true);
  };

  const handleCloseForm = () => {
    setShowRating(false);
  };

  const handleRatingSubmit = async (values: Record<string, any>) => {
    try {
      const ratingData: TRating = {
        userId: id || "",
        userName: user?.username || "",
        rating: values.rating,
        review: values.comment,
      };

      await createRating(ratingData, RateableEntityType.PRODUCT, selectedProductId as string);

      toast({
        title: "Rating submitted successfully",
        duration: 3500,
      });

      setShowRating(false);
      const response = await rateProduct(
        selectedProductId as string,
        order._id as string,
        values.rating,
        values.comment,
      );
    } catch (error) {
      toast({
        title: `Failed to submit rating, please try again later`,
        variant: "destructive",
        duration: 3500,
      });
    }
  };

  const { currency } = useCurrencyStore();
  const convertedTotalPrice = currencyExchange("EGP", currentOrder.totalPrice);
  const displayTotalPrice = convertedTotalPrice ? convertedTotalPrice.toFixed(0) : "N/A";

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-background shadow-lg p-6 overflow-auto z-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Order Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
          <span className="sr-only">Close details</span>
        </Button>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Products</h3>
            {order.items.map((item, index) => {
              const isRated = !!item.rating; // Check if the item is rated (assumes `item.rating` contains the rating)
              return (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-4">
                    <span>
                      {currency} {currencyExchange("EGP", item.price)?.toFixed(0)}
                    </span>
                    {isRated ? (
                      // Display smaller star with rating value
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500 h-4 w-4" />
                        <span className="text-sm font-medium">{item.rating?.rating || "N/A"}</span>
                      </div>
                    ) : (
                      // Show "Rate" button if the item is not rated
                      currentOrder.orderStatus === OrderStatus.delivered && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <button
                                className="text-[var(--primary-color)] transition-colors"
                                aria-label="Rate"
                                onClick={() => handleShowRating(item.productId)}
                              >
                                <Star className="h-5 w-5 fill-[var(--primary-color)]" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>Rate</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Information */}
          <div>
            <h3 className="font-semibold mb-2">Order Information</h3>
            <p>
              <strong>Order ID:</strong> {order._id?.slice(0, 6) || "N/A"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {order.createdAt ? formatOrderDate(order.createdAt.toString()) : "N/A"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  currentOrder.orderStatus === OrderStatus.cancelled
                    ? "text-red-500 font-semibold"
                    : currentOrder.orderStatus === OrderStatus.delivered
                      ? "text-green-500 font-semibold"
                      : "text-black"
                }
              >
                {currentOrder.orderStatus}
              </span>
            </p>
            <p>
              <strong>Total:</strong> {currency} {displayTotalPrice}
            </p>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p>{order.shippingAddress || "Not provided"}</p>
          </div>
        </div>
        {currentOrder.orderStatus !== OrderStatus.delivered &&
          currentOrder.orderStatus !== OrderStatus.cancelled && (
            <button
              className="mt-4 px-3 py-1 text-sm bg-red-500 text-white font-medium rounded shadow-sm hover:bg-red-600 focus:outline-none  transition-colors"
              onClick={handleShowCancelModal}
            >
              Cancel Order
            </button>
          )}
      </ScrollArea>
      {showRating && (
        <div className={OrdersPageStyles.modalOverlay}>
          <div className={OrdersPageStyles.modalContent}>
            <RatingForm
              ratingEntities={{
                rating: {
                  label: "How good is your Product?",
                  description: "",
                  type: "rating",
                },
                comment: {
                  label: "Care to share more?",
                  description: "Your feedback is important to us!",
                  type: "comment",
                },
              }}
              onSubmit={handleRatingSubmit}
              onClose={handleCloseForm} // Pass the close function to the RatingForm component
            />
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4 text-center">Are you sure you want to cancel?</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors"
              >
                Yes
              </button>
              <button
                onClick={handelCloseCancelOrder}
                className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
