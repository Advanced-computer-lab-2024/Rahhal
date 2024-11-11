import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { itinerariesColumns, TItinerary } from "@/features/tour-guide/utils/tour-guide-columns";
import { fetchItinerariesByOwner } from "@/api-calls/itineraries-api-calls";

import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { ItinerariesModal } from "./ItineraryModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useParams } from "react-router-dom";
import { TUser } from "@/types/user";
import { getUserById } from "@/api-calls/users-api-calls";
import TourGuideReviews from "./TourGuideReviews";
import ReviewDisplay from "@/components/Ratings";
import { sampleReviews } from "@/lib/utils";

function TourGuideView() {
  const { id } = useParams<{ id: string }>();
  const [itineraries, setItineraries] = useState<TItinerary[]>([]);
  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    const init = async () => {
      const itinerariesData = await fetchItinerariesByOwner(id!);
      const userData = await getUserById(id!);
      setItineraries(itinerariesData);
      setUser(userData);
    };

    init();
  }, []);

  const avatarLetters = useMemo(() => {
    return user?.firstName && user?.lastName ? `${user.firstName[0]}${user.lastName[0]}` : "US";
  }, [user]);

  return (
    <>
      <div className="flex justify-end sticky top-0 z-10">
        <Link to={`/user-settings/${id}`}>
          <Avatar className="h-10 w-10 mx-4 mt-4">
            <AvatarImage src={user?.profilePicture}></AvatarImage>
            <AvatarFallback>{avatarLetters}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
      <div className="flex flex-col container m-auto gap-10">
        <DataTable
          data={itineraries}
          columns={itinerariesColumns}
          newRowModal={
            <ItinerariesModal itineraryData={undefined} dialogTrigger={<DataTableAddButton />} />
          }
        />
        <div className="con">
          <ReviewDisplay reviews={user?.ratings ?? sampleReviews} />
        </div>
      </div>
    </>
  );
}

export default TourGuideView;
