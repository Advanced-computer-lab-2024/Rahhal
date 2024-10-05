import DetailsPageStyles from "./DetailsPage.module.css";
import aswan from "../../assets/Aswan.webp";
import pyramids from "../../assets/Pyramids.webp";
import pyramid2 from "../../assets/pyramids2.jpg";
import { useLocation } from "react-router-dom";
import { FaTags } from "react-icons/fa6";

const DetailsPage = () => {
  const location = useLocation();
  const { item } = location.state || {};

  return (
    <div className={DetailsPageStyles["details-page-content-container"]}>
      <div className={DetailsPageStyles["item-details"]}>
        {/* details goes here */}
        <h1>{item.title} </h1>
        <h3>
          {item.rating}
          The Pyramids of Giza are one of the Seven Wonders of the Ancient World and the last one
          standing. These iconic structures were built as tombs for Egypt's pharaohs and have stood
          the test of time for over 4,500 years
        </h3>

        <p>
          <FaTags style={{ marginRight: "10px" }} />
          Historical Site, World Wonder, Ancient Egypt
        </p>
        <p>
          Date of Construction: 2580-2560 BC <br></br> Time: 20 years
        </p>
        <p>Category</p>
        <p>special discount</p>
        <p>is booking open</p>
        <p>ratings</p>
        <p>preference tag</p>
        <p>tour Price</p>
        <p>language</p>
        <p>Accessibility</p>
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
          <h2>Tour Price:500 EGP </h2>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
