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

export const updatePreferenceTag = async (id: string, name: string) => {
  return PreferenceTag.findByIdAndUpdate(id, {name}, { new: true, runValidators: true });

}

export const deletePreferenceTag = async (id: string) => {
  return PreferenceTag.findByIdAndDelete(id);
}

