import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserBookmarks } from "@/api-calls/bookmark-api-calls";
import type {
  Activity,
  HistoricalPlace,
  IRating,
  Itinerary,
  TPopulatedBookmark,
} from "../../types/home-page-types";
import EntertainmentCard from "../EntertainmentCard";
import { Skeleton } from "@/components/ui/skeleton";
import { bookmarkType } from "@/utils/enums";

function BookmarksPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCardClick = (item: Itinerary | Activity | HistoricalPlace) => {
    // Navigate to detail page, pass the item data via state
    const type =
      "languages" in item ? "itinerary" : "isBookingOpen" in item ? "activity" : "historicalPlace";
    if (type === "historicalPlace") {
      navigate(`/hplace/details/${item._id}/${id ? id : ""}`, { state: { item } });
      return;
    }
    if (type === "activity")
      navigate(`/activities/${id}`, {
        state: { item },
      });
    if (type === "itinerary")
      navigate(`/itineraries/${id}`, {
        state: { item },
      });
  };
  const getAverageRating = (ratings?: IRating[]) => {
    if (!ratings || ratings.length === 0) return 0;
    return ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;
  };
  const {
    data: bookmarks,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["bookmarks", id],
    queryFn: () => fetchUserBookmarks(id ?? ""),
    select: (data) => data as TPopulatedBookmark[],
    enabled: !!id,
  });
  return (
    <>
      <div className="flex justify-center mt-[2%] mx-[10%]">
        <p className="text-[1.8rem] font-normal text-black">My Bookmarks</p>
      </div>
      <div className="flex mt-[2%] mx-[10%] gap-2">
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        )}

        {isSuccess &&
          bookmarks.map((item) => (
            <EntertainmentCard
              key={item.entity._id}
              id={item.entity._id}
              entityType={
                item.type === bookmarkType.Itinerary
                  ? bookmarkType.Itinerary
                  : item.type === bookmarkType.Activity
                    ? bookmarkType.Activity
                    : bookmarkType.HistoricalPlace
              }
              image={item.entity.images[0]}
              rating={getAverageRating(item.entity.ratings)}
              title={item.entity.name}
              price={item.entity.price}
              languages={item.type === bookmarkType.Itinerary ? item.entity.languages : undefined}
              availability={
                item.type === bookmarkType.Activity ? item.entity.isBookingOpen : undefined
              }
              openingTime={
                item.type === bookmarkType.HistoricalPlace ? item.entity.openingHours : undefined
              }
              date={item.type === bookmarkType.Activity ? item.entity.date : undefined}
              onClick={() => handleCardClick(item.entity)}
            />
          ))}
      </div>
    </>
  );
}

export default BookmarksPage;
