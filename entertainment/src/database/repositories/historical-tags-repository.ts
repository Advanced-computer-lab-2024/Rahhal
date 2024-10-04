import { HistoricalTagsModel } from "../models/HistoricalTag";
import type { IHistoricalTag } from "../models/HistoricalTag";

export async function createHistoricalTag(historicalTag: IHistoricalTag) {
  const newHistoricalTag = new HistoricalTagsModel(historicalTag);
  return await newHistoricalTag.save();
}

export async function getAllHistoricalTags(){
  return await HistoricalTagsModel.find();
}

export async function getHistoricalTagById(id: string) {
  return await HistoricalTagsModel.findById(id);
}

export async function getHistoricalTagsByName(name: string) {
  return await HistoricalTagsModel.findOne({ name });
}
