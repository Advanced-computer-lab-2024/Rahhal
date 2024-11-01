import * as complaintRepository from "@/database/repositories/complaint-repository";
import { type IComplaint } from "@/database/models/Complaint";

export async function getComplaints(): Promise<IComplaint[]> {
  return await complaintRepository.getComplaints();
}

export async function getComplaintsByOwner(ownerId: string): Promise<IComplaint[]> {
  return await complaintRepository.getComplaintsByOwner(ownerId);
}

export async function createComplaint(complaint: IComplaint): Promise<IComplaint> {
  return await complaintRepository.createComplaint(complaint);
}

export async function updateComplaint(
  complaintId: string,
  status: string,
): Promise<IComplaint | null> {
  return await complaintRepository.updateComplaint(complaintId, status);
}

export async function addReply(complaintId: string, reply: string): Promise<IComplaint | null> {
  return await complaintRepository.addReply(complaintId, reply);
}
