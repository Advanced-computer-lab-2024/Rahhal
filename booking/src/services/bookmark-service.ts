import type { IBookmark } from "@/utils/types";
import * as bookmarkRepository from "@/database/repositories/bookmark-repository";

export async function getBookmarks(filter: Partial<IBookmark>) {
  return await bookmarkRepository.getBookmarks(filter);
}

export async function getBookmarkById(id: string) {
  return await bookmarkRepository.getBookmarkById(id);
}

export async function createBookmark(bookmarkData: Partial<IBookmark>) {
  return await bookmarkRepository.createBookmark(bookmarkData);
}

export async function updateBookmark(id: string, bookmarkData: Partial<IBookmark>) {
  return await bookmarkRepository.updateBookmark(id, bookmarkData);
}

export async function deleteBookmarkById(id: string) {
  return await bookmarkRepository.deleteBookmarkById(id);
}

export async function deleteBookmark(bookmarkData: Partial<IBookmark>){
  return await bookmarkRepository.deleteBookmark(bookmarkData);
}
