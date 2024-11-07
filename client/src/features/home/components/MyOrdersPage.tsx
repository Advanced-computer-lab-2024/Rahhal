import OrdersPageStyles from "@/features/home/styles/MyOrdersPage.module.css";
import MyOrdersCard from "@/features/home/components/MyOrdersCard";
import { useState } from "react";
import ItemCard from "./ItemCard";
import RatingForm from "./RatingForm";
import { createRating } from "@/api-calls/rating-api-calls";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RateableEntityType } from "@/utils/enums";
import { TRating } from "@/features/home/types/home-page-types";
import { fetchUserOrders } from "@/api-calls/order-api-calls";
import { TOrder } from "@/features/home/types/home-page-types";



const formatOrderDate = (dateString: Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  }).format(date);
};

export const MyOrdersPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showAll, setShowAll] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); 
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null); // State to hold product ID



  const handleShowRating = (productId: string) => {
    setSelectedProductId(productId); // Set the product ID for the rating
    setShowRating(!showRating); // Show the rating form
  };
  
  const handleShowItems = (orderId: string) => {
    setShowItems(!showItems);
    setSelectedOrderId(orderId); 
    if(showRating && showItems)
      setShowRating(!showRating);
    
  };
  
  const handleRatingSubmit = async (values: Record<string, any>) => {
    try {
      const ratingData: TRating = {
        userId: id ? id : "",
        userName: "nanna",
        rating: values.rating,
        review: values.comment,
      };
      await createRating(ratingData, RateableEntityType.PRODUCT, selectedProductId as string); // Use selectedProductId here
      console.log("Rating submitted successfully:", ratingData);
      setShowRating(false);
    } catch (error) {
      console.error("Failed to submit rating:", error);
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
                date={formatOrderDate(card.orderDate)}
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
              {order.find((order) => order._id === selectedOrderId)?.items.map((item, index) => (
                <ItemCard key={index} title={item.name} price={item.price} image={item.picture} onRate={()=>handleShowRating(item.productId)}/>
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