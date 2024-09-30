import * as preferenceTagsRepository from '../repositories/preference-tags-repository';

export async function getPreferenceTags() {
  return await preferenceTagsRepository.getPreferenceTags();
}

export async function getPreferenceTag(id: string) {
  return await preferenceTagsRepository.getPreferenceTag(id);
}

export async function createPreferenceTag(name: string) {
  return await preferenceTagsRepository.createPreferenceTag(name);
}