import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import type { bookmarkType } from "@/utils/enums";
import { TPopulatedBookmark } from "@/features/home/types/home-page-types";

export async function fetchUserBookmarks(userId: string): Promise<TPopulatedBookmark[]> {
  const response = await axios.get(`${SERVICES_URLS.BOOKING}/bookmarks`, {
    params: { user: userId },
  });
  return response.data as TPopulatedBookmark[];
}

export async function isEntityBookmarked(
  userId: string,
  entityId: string,
  bookmarkType: bookmarkType,
): Promise<boolean> {
  const response = await axios.get(`${SERVICES_URLS.BOOKING}/bookmarks`, {
    params: { user: userId, entity: entityId, type: bookmarkType },
  });
  return Array.isArray(response.data) && response.data.length > 0;
}

export async function addBookmark(userId: string, entityId: string, bookmarkType: bookmarkType) {
  const response = await axios.post(`${SERVICES_URLS.BOOKING}/bookmarks`, {
    user: userId,
    entity: entityId,
    type: bookmarkType,
  });
  return response.data;
}

export async function removeBookmark(userId: string, entityId: string, bookmarkType: bookmarkType) {
  const response = await axios.delete(`${SERVICES_URLS.BOOKING}/bookmarks`, {
    params: { user: userId, entity: entityId, type: bookmarkType },
  });
  return response.data;
}
