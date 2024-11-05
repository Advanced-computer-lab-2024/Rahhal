import OrdersPageStyles from "@/features/home/styles/MyOrdersPage.module.css";
import MyOrdersCard from "@/features/home/components/MyOrdersCard";
import pyramids from "@/assets/pyramids.webp";
import pyramids2 from "@/assets/Aswan.webp";
import pyramids3 from "@/assets/pyramids2.jpg";
import hoodie from "@/assets/rahhal hoodie.jpeg";
import tshirt from "@/assets/rahhal tshirt.jpeg";
import bottle from "@/assets/rahhal bottle.jpeg"
import { useState } from "react";
import ItemCard from "./ItemCard";
import RatingForm from "./RatingForm";

export const MyOrdersPage = () => {
  // State to control the number of visible cards
  const [showAll, setShowAll] = useState(false);
  const [showItems, setShowItems] = useState(false);

 
  const handleShowItems = () => {
    setShowItems(!showItems);
  }
  console.log(showItems);
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
        <RatingForm  ratingEntities={
            {
            hawater: {
                label: "How was your overall experience?",
                description: "",
                type: "rating",
              },
              comment: {
                label: "Care to share more?",
                description: "Your feedback is important to us!",
                type: "comment",
              },
              nanna:{
                label: "How was your overall experience?",
                description: "",
                type: "rating",
              }
            }

        } onSubmit={(values)=>console.log(values.hawater)}/>
        
        <div className={OrdersPageStyles["default-rating div"]}>

        </div>
        
        <div className={OrdersPageStyles["itemSection"]}>
          <ItemCard imageSrc={hoodie} title={"Rahhal T-shirt"} price={"600 EGP"} />
          <ItemCard imageSrc={bottle} title={"Rahhal T-shirt"} price={"600 EGP"} />
          <ItemCard imageSrc={tshirt} title={"Rahhal T-shirt"} price={"600 EGP"} />
          <ItemCard imageSrc={hoodie} title={"Rahhal T-shirt"} price={"600 EGP"} />
          <ItemCard imageSrc={tshirt} title={"Rahhal T-shirt"} price={"600 EGP"} />
          
        </div>
      </div>
    </>
  );
};
