import OrdersPageStyles from "@/features/home/styles/MyOrdersPage.module.css";
import MyOrdersCard from "@/features/home/components/MyOrdersCard";
import hoodie from "@/assets/rahhal hoodie.jpeg";
import tshirt from "@/assets/rahhal tshirt.jpeg";
import bottle from "@/assets/rahhal bottle.jpeg";
import { useState } from "react";
import ItemCard from "./ItemCard";
import RatingForm from "./RatingForm";
import { createRating } from "@/api-calls/rating-api-calls";
import { useParams } from "react-router-dom";
import { RateableEntityType } from "@/utils/enums";
import { TRating } from "@/features/home/types/home-page-types";

export const MyOrdersPage = () => {
  const { id } = useParams<{ id: string }>();

  const [showAll, setShowAll] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const handleShowRating = () => {
    setShowRating(!showRating);
  };
  const handleShowItems = () => {
    setShowItems(!showItems);
  };

  const handleRatingSubmit = async (values: Record<string, any>) => {
    try {
      const ratingData: TRating = {
        userId: id ? id : "",
        userName: "nanna",
        rating: values.rating,
        review: values.comment,
      };
      await createRating(ratingData, RateableEntityType.PRODUCT, "672aaa830fcf3a74d27b2f59");
      console.log("Rating submitted successfully:", ratingData);
      setShowRating(false);
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  const cardsData = [
    { images: [tshirt, hoodie, bottle] },
    { images: [tshirt, bottle, hoodie] },
    { images: [hoodie, tshirt, bottle] },
    { images: [bottle, hoodie, tshirt] },
    { images: [hoodie, tshirt, bottle] },
    { images: [hoodie, tshirt, bottle] },
  ];
  const visibleCards = showAll ? cardsData : cardsData.slice(0, 3);

  return (
    <>
      <div className={OrdersPageStyles["order-page-header"]}>
        <p>My Orders</p>
      </div>

      <div className={OrdersPageStyles["container"]}>
        <div className={OrdersPageStyles["orders-card-container"]}>
          {visibleCards.map((card, index) => (
            <MyOrdersCard key={index} images={card.images} onView={handleShowItems} />
          ))}

          {cardsData.length > 3 && (
            <div className={OrdersPageStyles["show-more"]}>
              <button onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>

        {showItems && (
          <div className={OrdersPageStyles["itemSection"]}>
            <ItemCard
              imageSrc={hoodie}
              title={"Rahhal T-shirt"}
              price={"600 EGP"}
              onRate={handleShowRating}
            />
          </div>
        )}

        {showRating && (
          <div className={OrdersPageStyles.modalOverlay} >
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
