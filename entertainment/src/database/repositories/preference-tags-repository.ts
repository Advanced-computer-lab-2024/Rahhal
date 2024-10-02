import PreferenceTag from "@/database/models/PreferenceTag";

export async function getPreferenceTags() {
  return await PreferenceTag.find();
}

export async function getPreferenceTag(id: string) {
  return await PreferenceTag.findById(id);
}

export async function getPreferenceTagByName(name: string) {
  return await PreferenceTag.findOne({ name });
}

export async function createPreferenceTag(name: string) {
  return await PreferenceTag.create({ name });
}

export async function updatePreferenceTag(id: string, name: string) {
  return await PreferenceTag.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });
}

export async function deletePreferenceTag(id: string) {
  return await PreferenceTag.findByIdAndDelete(id);
}
