import DetailsPageStyles from "./DetailsPage.module.css";
import aswan from "../../assets/Aswan.webp";
import pyramids from "../../assets/Pyramids.webp";
import pyramid2 from "../../assets/pyramids2.jpg";
import { useLocation } from "react-router-dom";
import { FaTags } from "react-icons/fa6";

const DetailsPage = () => {
  const location = useLocation();
  const { item } = location.state || {};

  const getAverageRating = (ratings: number[]) => {
    return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  }

  return (
    <div className={DetailsPageStyles["details-page-content-container"]}>
      <div className={DetailsPageStyles["item-details"]}>
        {/* details goes here */}
        <h1>{item.name} </h1>
        <h3>
          {item.details}
        </h3>

        <p>
          <FaTags style={{ marginRight: "10px" }} />
          {item.preferenceTags}
        </p>
        <p>
          {item.date} <br></br> {item.time}
        </p>
        <p>{item.category}</p>
        <p>{item.timeline}</p>
        <p>{item.duarationOfActivities}</p>
        <p>Rating:{item.rating}</p>
        <p>{item.accessibility}</p>
        <p>{item.language}</p>
 
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
          <h2>Tour Price:{item.price}  </h2>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
