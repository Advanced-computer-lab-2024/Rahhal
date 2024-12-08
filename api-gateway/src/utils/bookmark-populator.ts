import type { AxiosResponse } from "axios";
import { bookmarkType } from "@/utils/types";
import { entertainmentAxiosInstance } from "@/utils/axios-instances";
import type { IBookmark, IActivity, IItinerary, PopulatedBookmark } from "@/utils/types";

async function populateEntity(
  entity: string,
  type: string,
): Promise<IActivity | IItinerary | string> {
  let populatedEntity: AxiosResponse<IActivity | IItinerary> | undefined;
  if (type === bookmarkType.Activity)
    populatedEntity = await entertainmentAxiosInstance.get<IActivity>(`/activities/${entity}`);
  else if (type === bookmarkType.Itinerary)
    populatedEntity = await entertainmentAxiosInstance.get<IItinerary>(`/itineraries/${entity}`);
  else if (type === bookmarkType.HistoricalPlace)
    populatedEntity = await entertainmentAxiosInstance.get<IItinerary>(
      `/historical-places/${entity}`,
    );
  else return entity;

  return populatedEntity.data;
}

export async function populateBookmark(bookmark: IBookmark): Promise<PopulatedBookmark> {
  const populatedEntity = await populateEntity(bookmark.entity, bookmark.type);
  return {
    _id: bookmark._id,
    user: bookmark.user,
    entity: populatedEntity,
    type: bookmark.type,
  };
}

export async function populateBookmarks(bookmarks: IBookmark[]): Promise<PopulatedBookmark[]> {
  return Promise.all(
    bookmarks.map(async (bookmark) => {
      return populateBookmark(bookmark);
    }),
  );
}
