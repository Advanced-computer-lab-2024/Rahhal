import DetailsPageStyles from "./DetailsPage.module.css";
import aswan from "../../assets/Aswan.webp";
import pyramids from "../../assets/Pyramids.webp";
import pyramid2 from "../../assets/pyramids2.jpg";
import { useLocation } from "react-router-dom";
import { FaTags } from "react-icons/fa6";
import { IoMdStar } from "react-icons/io";
import { getPriceValue } from "../home-page/main-content-div/GeneralGridView";

const DetailsPage = () => {
  const location = useLocation();
  const { item } = location.state || {}; // Access the passed item through state

  const getAverageRating = (ratings?: number[]) => {
    if (!ratings || ratings.length === 0) return 0;
    return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  };

  // const renderSpecificDetails = () => {
  //   switch (item.type) {
  //     case "historical_place":
  //       return <HistoricalPlaceDetails item={item} />;
  //     case "activity":
  //       return <ActivityDetails item={item} />;
  //     case "itinerary":
  //       return <ItineraryDetails item={item} />;
  //     default:
  //       return <p>No specific details available for this item type.</p>;
  //   }
  // };

  return (
    <div className={DetailsPageStyles["details-page-content-container"]}>
      <div className={DetailsPageStyles["item-details"]}>
        {/* details goes here */}
        <h1>{item.name} </h1>

        <h3>{item.description}</h3>

        <p>
          <FaTags style={{ marginRight: "10px" }} />
          {item.preferenceTags?.map((tag: { name: string }) => tag.name).join(", ")}
        </p>

        {/* <p>
          item.Date.is Date: {new Date(item.date).toLocaleDateString()} <br /> Time:{" "}
          {new Date(item.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{" "}
        </p> */}

        <p>Category: {item.category.name}</p>

        <p>
          Rating: {getAverageRating(item.ratings.rating)}{" "}
          <IoMdStar style={{ marginLeft: "0.4rem", fontSize: "1.1rem", color: "#FDCC0D" }} />{" "}
        </p>

        {item.lanugages ? (
          <p>{Array.isArray(item.language) ? item.language.join("/") : item.language}</p>
        ) : null}

        {item.timeline ? (
          <p>
            Timeline: {item.timeline}-{item.timeline}{" "}
          </p>
        ) : null}

        {item.owner ? <p>Owner: {item.owner}</p> : null}

        {item.activities
          ? item.activities.map((activity: string, index: number) => {
              const duration = item.duarationOfActivities[index];
              // Check if both the activity and its duration are available
              return activity && duration ? (
                <p key={index}>
                  <strong>{activity}:</strong> {duration}
                </p>
              ) : null;
            })
          : null}
        {item.openingHours ? (
          <p>
            Opening Hours: {item.openingHours.open}-{item.openingHours.close}
          </p>
        ) : null}

        {item.accessibility ? (
          <p>
            <strong>Accessibility:</strong> {item.accessibility}
          </p>
        ) : null}




        {/* this section is for products details to whoever is working with it */}




      </div>

      <div className={DetailsPageStyles["image-grid"]}>
        {/* grid with images goes here */}
        <div className={DetailsPageStyles["item-1"]}>
          <img src={aswan} />
        </div>
        <div className={DetailsPageStyles["item-2"]}>
          <img src={pyramids} />
        </div>
        <div className={DetailsPageStyles["item-3"]}>
          <img src={pyramid2} />
        </div>
        <div className={DetailsPageStyles["price-section"]}>
          <div>
            {Array.isArray(item.price) ? (
              item.price.map((price: { type: string; price: number }) => (
                <p key={price.type}>
                  {price.type.toUpperCase()}: {price.price} EGP
                </p>
              ))
            ) : (
              <>
                <p>Foreigner: {item.price.foreigner} EGP</p>
                <p>Native: {item.price.native} EGP</p>
                <p>Student: {item.price.student} EGP</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
