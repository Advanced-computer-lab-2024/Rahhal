import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";
import { TPreferenceTag } from "@/table-columns/preference-tags-columns";

//fetch all preference tags from preference tags endpoint
export const fetchPreferenceTags = async () => {
  const {data} = await axios.get(SERVICES_URLS.ENTERTAINMENT + "/preference-tags");
  return data;
};

//delete preference tag by id
export const deletePreferenceTag = async (id: string) => {
  const response = await axios.delete(SERVICES_URLS.ENTERTAINMENT + "/preference-tags/"+id);
  return response.data;
};

//submit preference tag
export const submitPreferenceTag = async (preferenceTagData : TPreferenceTag | undefined, isNewPreferenceTag : boolean) => {
    if(isNewPreferenceTag) {
        await axios.post(SERVICES_URLS.ENTERTAINMENT + "/preference-tags", preferenceTagData).then((response) => {
            console.log(response.data);
        });
    }
    else {
        if(preferenceTagData) {
            await axios.patch(
                `${SERVICES_URLS.ENTERTAINMENT}/preferencetags/${preferenceTagData._id}`,
                preferenceTagData

            );
            }
            
    }
    }
