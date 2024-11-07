import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TComplaint } from "@/features/user-settings/utils/tourist-complaints-columns";

export const fetchComplaints = async () => {
  const response = await axios.get(SERVICES_URLS.USER + "/complaints");
  return response.data;
};

export const fetchComplaintByOwner = async (ownerId: string) => {
  const response = await axios.get(SERVICES_URLS.USER + "/complaints/" + ownerId);
  return response.data;
}

export const createComplaint = async (comnplaint: TComplaint) => {
  const response = await axios.post(SERVICES_URLS.USER + "/complaints", comnplaint);
  return response.data;
};

export const updateComplaint = async (complaintId: string, status: string) => {
  const response = await axios.patch(SERVICES_URLS.USER + "/complaints/" + complaintId, { status });

  console.log(response.data);
  alert("Complaint updated successfully");
  window.location.reload();
};

export const addReply = async (complaintId: string, reply: string) => {
  const response = await axios.post(SERVICES_URLS.USER + "/complaints/" + complaintId, { reply });
  return response.data;
};
