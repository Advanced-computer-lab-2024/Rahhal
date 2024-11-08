import OrdersPageStyles from "@/features/home/styles/MyOrdersPage.module.css";
import MyOrdersCard from "@/features/home/components/MyOrdersCard";
import { useState } from "react";
import ItemCard from "./ItemCard";
import RatingForm from "./RatingForm";
import { createRating } from "@/api-calls/rating-api-calls";
import { rateProduct } from "@/api-calls/order-api-calls";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RateableEntityType } from "@/utils/enums";
import { TRating } from "@/features/home/types/home-page-types";
import { fetchUserOrders } from "@/api-calls/order-api-calls";
import { getUserById } from "@/api-calls/users-api-calls";
import { TOrder } from "@/features/home/types/home-page-types";
import { useToast } from "@/hooks/use-toast";

const formatOrderDate = (dateString: string | undefined) => {
  if (!dateString) return "Invalid Date";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  }).format(date);
};

export const MyOrdersPage = () => {
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [showAll, setShowAll] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleShowRating = (productId: string) => {
    setSelectedProductId(productId); // Set the product ID for the rating
    setShowRating(!showRating); // Show the rating form
  };

  const handleShowItems = (orderId: string) => {
    setShowItems(true);
    setSelectedOrderId(orderId);
    if (showRating && showItems) setShowRating(!showRating);
  };

  const handleRatingSubmit = async (values: Record<string, any>) => {
    try {
      const user = id ? await getUserById(id) : null;

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
        selectedOrderId as string,
        values.rating,
        values.comment,
      );
      console.log("Product rating response:", response);
    } catch (error) {
      console.error("Failed to submit rating:", error);
      toast({
        title: `Failed to submit rating: ${error instanceof Error ? error.message : error}`,
        variant: "destructive",
        duration: 3500,
      });
    }
  };

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery<TOrder[]>({
    queryKey: ["userOrders", id],
    queryFn: () => fetchUserOrders(id as string),
    enabled: !!id,
  });

  const visibleOrders = showAll ? order : order?.slice(0, 3);
  return (
    <>
      <div className={OrdersPageStyles["order-page-header"]}>
        <p>My Orders</p>
      </div>

      <div className={OrdersPageStyles["container"]}>
        <div className={OrdersPageStyles["orders-card-container"]}>
          {visibleOrders &&
            visibleOrders.map((card, index) => (
              <MyOrdersCard
                key={index}
                date={formatOrderDate(card.createdAt.toString())}
                itemsCount={card.totalQuantity}
                status={card.orderStatus}
                price={card.totalPrice}
                images={card.items.map((item) => item.picture)}
                onView={() => handleShowItems(card._id)}
              />
            ))}

          {order && order.length > 3 && (
            <div className={OrdersPageStyles["show-more"]}>
              <button onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>

        {showItems && order && order.find((order) => order._id === selectedOrderId)?.items && (
          <div className={OrdersPageStyles["itemSection"]}>
            {order
              .find((order) => order._id === selectedOrderId)
              ?.items.map((item, index) => (
                <ItemCard key={index} item={item} onRate={() => handleShowRating(item.productId)} />
              ))}
          </div>
        )}

        {showRating && (
          <div className={OrdersPageStyles.modalOverlay}>
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
            />
          </div>
        )}
      </div>
    </>
  );
};
