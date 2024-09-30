import * as preferenceTagsRepository from '../repositories/preference-tags-repository';

export const getPreferenceTags= async ()=>{ 
  return await preferenceTagsRepository.getPreferenceTags();
}

export const getPreferenceTag= async (id: string) => {
  return await preferenceTagsRepository.getPreferenceTag(id);
}

export const createPreferenceTag= async (name: string) => {
  return await preferenceTagsRepository.createPreferenceTag(name);
}

export const updatePreferenceTag = async (id: string, name:string) => {
  return await preferenceTagsRepository.updatePreferenceTag(id, name);
}

export const deletePreferenceTag = async (id: string) => {
  return await preferenceTagsRepository.deletePreferenceTag(id);
}

