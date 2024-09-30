import { PreferenceTag } from "../models/PreferenceTag";


export const getPreferenceTags = async () => {
  return PreferenceTag.find();
};

export const getPreferenceTag = async (id: string) => {
  return PreferenceTag.findById(id);
};

export const createPreferenceTag = async (name: string) => {
  return PreferenceTag.create({ name });
};