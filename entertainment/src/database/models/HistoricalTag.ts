import mongoose from "mongoose";

export interface IHistoricalTag {
  name: string;
};

const HistoricalTagsSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Historical Tag name is required'],
    unique: [true, 'Historical Tag already exists']
  }
});

export const HistoricalTagsModel = mongoose.model<IHistoricalTag>("HistoricalTags",HistoricalTagsSchema);
