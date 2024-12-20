import * as preferenceTagsRepository from "@/database/repositories/preference-tags-repository";

export const getPreferenceTags = async () => {
  return await preferenceTagsRepository.getPreferenceTags();
};

export const getPreferenceTag = async (id: string) => {
  return await preferenceTagsRepository.getPreferenceTag(id);
};

export async function getPreferenceTagByName(name: string) {
  return await preferenceTagsRepository.getPreferenceTagByName(name);
}

export const createPreferenceTag = async (name: string) => {
  return await preferenceTagsRepository.createPreferenceTag(name);
};

export async function updatePreferenceTag(id: string, name: string) {
  return await preferenceTagsRepository.updatePreferenceTag(id, name);
}

export async function deletePreferenceTag(id: string) {
  return await preferenceTagsRepository.deletePreferenceTag(id);
}
