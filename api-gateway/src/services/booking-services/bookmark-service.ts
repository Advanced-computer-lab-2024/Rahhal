import { bookingAxiosInstance } from "@/utils/axios-instances";
import type { IBookmark, IBookmarkQueryParamsFilter } from "@/utils/types";
import { populateBookmark, populateBookmarks } from "@/utils/bookmark-populator";

export async function getBookmarks(filter: Partial<IBookmarkQueryParamsFilter>) {
  try {
    const bookmarks = await bookingAxiosInstance.get("/bookmarks", { params: filter });
    return populateBookmarks(bookmarks.data);
  }
  catch (error) {
    return new Error("Failed to fetch bookmarks from booking server\n" + error);
  }
}

export async function getBookmarkById(id: string) {
  try {
    const bookmark = await bookingAxiosInstance.get(`/bookmarks/${id}`);
    return populateBookmark(bookmark.data);
  }
  catch (error) {
    return new Error("Failed to fetch bookmark from booking server\n" + error);
  }
}

export async function createBookmark(body: string) {
  return bookingAxiosInstance.post("/bookmarks", body);
}

export async function updateBookmark(id: string, body: string) {
  return bookingAxiosInstance.patch(`/bookmarks/${id}`, body);
}

export async function deleteBookmarkById(id: string) {
  return bookingAxiosInstance.delete(`/bookmarks/${id}`);
}

export async function deleteBookmark(bookmarkData: Partial<IBookmark>) {
  return bookingAxiosInstance.delete("/bookmarks", { params: bookmarkData});
}
