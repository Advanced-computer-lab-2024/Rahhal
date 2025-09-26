import DetailsPageStyles from "../styles/DetailsPage.module.css";
import aswan from "@/assets/Aswan.webp";
import { useLocation, useParams } from "react-router-dom";
import { FaTags } from "react-icons/fa6";
import { IoMdStar } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import TouristHomePageNavigation from "@/features/home/components/TouristHomePageNavigation";
import GoogleMap from "@/components/google-maps/GoogleMap";

import {
  useCurrencyStore,
  useRatesStore,
} from "@/stores/currency-exchange-store";
import { currencyExchangeSpec } from "@/utils/currency-exchange";
import { fetchHistoricalPlaceById } from "@/api-calls/historical-places-api-calls";
import { useQuery } from "@tanstack/react-query";
import { HistoricalPlace } from "../types/home-page-types";
import { fetchProductById } from "@/api-calls/products-api-calls";
import { useEffect } from "react";
import SharePopover from "@/components/SharePopover";
import useUserStore from "@/stores/user-state-store";

const DetailsPage = () => {
  const { placeid, type } = useParams();
  const { id } = useUserStore();
  const { data: item, isPending: isItemPending } = useQuery({
    queryKey: [
      `${type == "hplace" ? "historical-places" : "product"}`,
      placeid,
    ],
    queryFn: () => {
      if (type === "hplace") {
        return fetchHistoricalPlaceById(placeid!);
      } else if (type === "product") {
        return fetchProductById(placeid!);
      } else {
        return Promise.reject(new Error("Invalid type"));
      }
    },
    select: (data) => data as any,
  });

  const getAverageRating = (ratings?: number[]) => {
    if (!ratings || ratings.length === 0) return 0;
    return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  };

  const getLocationOnMap = (location: {
    longitude: number;
    latitude: number;
  }) => {
    return (
      <GoogleMap
        isEditable={false}
        location={{ lat: location.latitude, lng: location.longitude }}
        setLocation={() => {}}
        className={"w-[350px] h-[250px]"}
      />
    );
  };

  const { currency } = useCurrencyStore();
  const { rates } = useRatesStore();
  useEffect(() => {
    console.log(item);
  }, [item]);
  return (
    <div className={DetailsPageStyles["full-page-container"]}>
      <TouristHomePageNavigation /*loggedIn={id ? true : false}*/ />
      {!isItemPending && (
        <div className={DetailsPageStyles["details-page-content-container"]}>
          <div className={DetailsPageStyles["item-details"]}>
            {/* details goes here */}
            <div className="flex justify-between">
              <h1>{item!.name} </h1>
              <SharePopover
                link={`${window.location.origin}/${type}/details/${placeid}`}
              />
            </div>

            <h3>{item!.description}</h3>

            <p>
              <FaTags style={{ marginRight: "10px" }} />
              {item!.preferenceTags
                ?.map((tag: { name: string }) => tag.name)
                .join(", ")}
            </p>

            {item.specialDiscount ? (
              <p>Special Discounts: {item.specialDiscount}</p>
            ) : null}

            {item.date ? (
              <p>
                Date: {new Date(item.date).toLocaleDateString()} <br />
                Time:{" "}
                {new Date(item.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            ) : item.availableDatesTime &&
              item.availableDatesTime.length > 0 ? (
              <div style={{ marginTop: "4%" }}>
                <strong>Available Dates and Times:</strong>
                {item.availableDatesTime.map(
                  (dateTime: { Date: string; Time: string }, index: number) => (
                    <p key={index}>
                      Date: {new Date(dateTime.Date).toLocaleDateString()}{" "}
                      <br />
                      Time:{" "}
                      {new Date(dateTime.Time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )
                )}
              </div>
            ) : null}

            {item.category ? <p>Category: {item.category.name}</p> : null}

            {"isBookingOpen" in item ? (
              item.isBookingOpen === true ? (
                <p>Available to Book NOW!</p>
              ) : (
                <p>Booking Closed!</p>
              )
            ) : null}

            <p>
              Rating: {getAverageRating(item.ratings.rating)}{" "}
              <IoMdStar
                style={{
                  marginLeft: "0.4rem",
                  fontSize: "1.1rem",
                  color: "#FDCC0D",
                }}
              />{" "}
            </p>

            {item.languages ? (
              <p>
                <CiGlobe
                  style={{ marginRight: "0.4rem", fontSize: "1.1rem" }}
                />{" "}
                Languages: {item.languages.join("/")}
              </p>
            ) : null}

            {item.timeline ? (
              <p>
                Timeline: {item.timeline}-{item.timeline}{" "}
              </p>
            ) : null}

            {item.activities
              ? item.activities.map((activity: string, index: number) => {
                  const duration = item.duarationOfActivities[index];
                  return activity && duration ? (
                    <p key={index}>
                      <strong>{activity}:</strong> {duration}
                    </p>
                  ) : null;
                })
              : null}
            {item.openingHours ? (
              <p>
                Opening Hours: {item.openingHours.open}-
                {item.openingHours.close}
              </p>
            ) : null}

            {item.accessibility ? (
              <p>
                <strong>Accessibility:</strong> {item.accessibility}
              </p>
            ) : null}

            {item.pickUpLocation ? (
              <div>
                <p>
                  <strong>Pick Up Location:</strong>
                </p>
                {getLocationOnMap(item.pickUpLocation)}

                <p>
                  <strong>Drop Off Location:</strong>
                </p>
                {getLocationOnMap(item.dropOffLocation)}
              </div>
            ) : null}

            {item.location ? (
              <div>
                <p>
                  <strong>Location:</strong>
                </p>
                {getLocationOnMap(item.location)}
              </div>
            ) : null}

            {/* this section is for products details to whoever is working with it */}

            {item.ratings && item.ratings.length > 0 ? (
              <div>
                <p>
                  <strong>User Reviews:</strong>
                </p>
                <ul>
                  {item.ratings.map(
                    (
                      rating: { user: string; rating: number; review?: string },
                      index: number
                    ) => (
                      <li key={index}>
                        <p>
                          <strong>User ID:</strong> {rating.user}
                        </p>
                        <p>
                          <strong>Rating:</strong> {rating.rating} / 5
                        </p>
                        {rating.review && (
                          <p>
                            <strong>Review:</strong> {rating.review}
                          </p>
                        )}
                      </li>
                    )
                  )}
                </ul>
              </div>
            ) : (
              <p>No reviews available.</p>
            )}
            {item.seller ? <p>Seller: {item.sellerName}</p> : null}
          </div>

          <div className={DetailsPageStyles["image-grid"]}>
            {type == "hplace" &&
              item.images.map((image: string, index: number) => (
                <div className={DetailsPageStyles[`item-${index + 1}`]}>
                  <img src={image} />
                </div>
              ))}
            {type == "product" && (
              <div className={DetailsPageStyles[`item-1`]}>
                <img src={item.picture} />
              </div>
            )}
            <div className={DetailsPageStyles["price-section"]}>
              <div>
                {typeof item.price === "number" ? (
                  <h1>
                    Price:{" "}
                    {item.price
                      ? currencyExchangeSpec(
                          "EGP",
                          item.price,
                          rates,
                          currency
                        )?.toFixed(0)
                      : "N/A"}{" "}
                    {currency}
                  </h1>
                ) : (
                  item.price &&
                  Object.entries(item.price).map(([key, value], index) => {
                    const convertedValue = value
                      ? currencyExchangeSpec(
                          "EGP",
                          Number(value),
                          rates,
                          currency
                        )
                      : undefined;
                    const displayConvertedValue = convertedValue
                      ? convertedValue.toFixed(0)
                      : "N/A";

                    return (
                      <h1 key={index}>
                        {key}: {displayConvertedValue} {currency}
                      </h1>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
