import Bookmark from "../models/Bookmark";
import type { IBookmark } from "@/utils/types";

export async function getBookmarks(filter: Partial<IBookmark>) {
  return await Bookmark.find(filter);
}

export async function getBookmarkById(id: string) {
  return await Bookmark.findById(id);
}

export async function createBookmark(bookmarkData: Partial<IBookmark>) {
  const newBookmark = new Bookmark(bookmarkData);
  return await newBookmark.save();
}

export async function updateBookmark(id: string, bookmarkData: Partial<IBookmark>) {
  return await Bookmark.findByIdAndUpdate(id, bookmarkData, { new: true, runValidators: true });
}

export async function deleteBookmark(id: string) {
  return await Bookmark.findByIdAndDelete(id);
}
