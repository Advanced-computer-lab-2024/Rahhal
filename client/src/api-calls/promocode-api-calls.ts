import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TPromocode } from "@/types/shared";

export const fetchPromocodes = async () => {
  const response = await axios.get(SERVICES_URLS.PAYMENT + `/promocode`);
  return response.data;
};

export const deletePromocode = async (promocodeId: string) => {
  const response = await axios.delete(SERVICES_URLS.PAYMENT + `/promocode/${promocodeId}`);
  return response;
};

export const submitPromocode = async (promocodeData: TPromocode | undefined, isNewPromocode: boolean) => {
  if (isNewPromocode) {
    if (promocodeData) {
      const { _id, ...newPromocodeData } = promocodeData;
      const response = await axios.post(SERVICES_URLS.PAYMENT + "/promocode", newPromocodeData);
      return response;
    }
    
  } else {
    if (promocodeData) {
      const response = await axios.patch(`${SERVICES_URLS.PAYMENT}/promocode/${promocodeData._id}`, promocodeData);
      return response;
    }
  }
}