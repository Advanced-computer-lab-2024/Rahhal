import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TPromocode } from "@/types/shared";

export const fetchPromocodes = async () => {
  const response = await axios.get(SERVICES_URLS.PAYMENT + `/promocode`);
  return response.data;
};

export const submitPromocode = async (promocodeData: TPromocode | undefined, isNewPromocode: boolean) => {
  if (isNewPromocode) {
    if (promocodeData) {
      const { _id, ...newPromocodeData } = promocodeData;
      await axios.post(SERVICES_URLS.PAYMENT + "/promocode", newPromocodeData);
    }
    alert("Promocode created successfully");
    window.location.reload();
  } else {
    if (promocodeData) {
      await axios.patch(`${SERVICES_URLS.PAYMENT}/promocode/${promocodeData._id}`, promocodeData);
      alert("Promocode updated successfully");
      window.location.reload();
    }
  }
}