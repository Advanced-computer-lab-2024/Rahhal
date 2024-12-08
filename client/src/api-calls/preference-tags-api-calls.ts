import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";
import { TPreferenceTag } from "@/features/admin/utils/columns-definitions/preference-tags-columns";

//fetch all preference tags from preference tags endpoint
export const fetchPreferenceTags = async () => {
  const { data } = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/preference-tags");
  return data;
};

// fetch preference tag by id
export const fetchPreferenceTagById = async (id: string) => {
  const response = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/preference-tags/" + id);
  return response.data;
};

//delete preference tag by id
export const deletePreferenceTag = async (id: string) => {
  const response = await axios.delete(SERVICES_URLS.ENTERTAINMENT + "/preference-tags/" + id);
  return response;
};

//submit preference tag
export const submitPreferenceTag = async (
  preferenceTagData: TPreferenceTag | undefined,
  isNewPreferenceTag: boolean,
) => {
  if (isNewPreferenceTag) {
    const response = await axios.post(SERVICES_URLS.ENTERTAINMENT + "/preference-tags", preferenceTagData);
    return response;
  } else {
    if (preferenceTagData) {
      const response = await axios.patch(
        `${SERVICES_URLS.ENTERTAINMENT}/preference-tags/${preferenceTagData._id}`,
        preferenceTagData,
      );
      return response;
    }
  }
};
