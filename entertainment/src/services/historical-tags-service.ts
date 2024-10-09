import type { IHistoricalTag } from "../database/models/HistoricalTag";
import * as historicalTagsRepository from "../database/repositories/historical-tags-repository";

export async function createHistoricalTag(historicalTag: string) {
  const newHistoricalTag = { name: historicalTag };
  return await historicalTagsRepository.createHistoricalTag(newHistoricalTag);
}

export async function getAllHistoricalTags() {
  return await historicalTagsRepository.getAllHistoricalTags();
}

export async function getHistoricalTagById(id: string) {
  return await historicalTagsRepository.getHistoricalTagById(id);
}

export async function getHistoricalTagsByName(name: string) {
  return await historicalTagsRepository.getHistoricalTagsByName(name);
}
