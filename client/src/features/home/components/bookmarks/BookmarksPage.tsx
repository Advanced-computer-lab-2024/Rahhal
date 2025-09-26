import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchUserBookmarks } from "@/api-calls/bookmark-api-calls";
import NoBookMarks from "@/assets/NoBookMark.png";
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
import useUserStore from "@/stores/user-state-store";

function BookmarksPage() {
  const { id } = useUserStore();
  const navigate = useNavigate();

  const handleCardClick = (item: Itinerary | Activity | HistoricalPlace) => {
    // Navigate to detail page, pass the item data via state
    const type =
      "languages" in item
        ? "itinerary"
        : "isBookingOpen" in item
          ? "activity"
          : "historicalPlace";
    if (type === "historicalPlace") {
      navigate(`/hplace/details/${item._id}`, { state: { item } });
      return;
    }
    if (type === "activity")
      navigate(`/activities`, {
        state: { item },
      });
    if (type === "itinerary")
      navigate(`/itineraries`, {
        state: { item },
      });
  };
  const getAverageRating = (ratings?: IRating[]) => {
    if (!ratings || ratings.length === 0) return 0;
    return (
      ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
    );
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
      <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 mx-4 sm:mx-6 md:mx-[8%] lg:mx-[10%]">
        <p className="text-xl sm:text-2xl md:text-[1.8rem] font-normal text-black text-center">
          My Bookmarks
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8 mx-4 sm:mx-6 md:mx-[8%] lg:mx-[10%] justify-items-center">
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        )}

        {bookmarks?.length === 0 && isSuccess && (
          <div className="flex flex-col justify-center items-center h-[50vh] w-full gap-4 sm:gap-6 md:gap-8 col-span-full">
            <img
              src={NoBookMarks}
              className="w-32 sm:w-40 md:w-[10.5rem] max-w-xs h-auto mb-4"
              alt="No Bookmarked Items"
            />
            <p className="text-lg sm:text-xl md:text-[1.5rem] font-normal text-black text-center px-4">
              No Saved Events
            </p>
          </div>
        )}

        {isSuccess &&
          bookmarks &&
          bookmarks.length > 0 &&
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
              languages={
                item.type === bookmarkType.Itinerary
                  ? item.entity.languages
                  : undefined
              }
              availability={
                item.type === bookmarkType.Activity
                  ? item.entity.isBookingOpen
                  : undefined
              }
              openingTime={
                item.type === bookmarkType.HistoricalPlace
                  ? item.entity.openingHours
                  : undefined
              }
              date={
                item.type === bookmarkType.Activity
                  ? item.entity.date
                  : undefined
              }
              onClick={() => handleCardClick(item.entity)}
            />
          ))}
      </div>
    </>
  );
}

export default BookmarksPage;
