import type { IComplaint } from "../models/Complaint";
import Complaint from "../models/Complaint";

export async function getComplaints(): Promise<IComplaint[]> {
  return await Complaint.find().populate("owner").exec();
}

export async function getComplaintsByOwner(ownerId: string): Promise<IComplaint[]> {
  return await Complaint.find({ owner: ownerId }).populate("owner").exec();
}

export async function createComplaint(complaint: IComplaint): Promise<IComplaint> {
  const newComplaint = new Complaint(complaint);
  return await newComplaint.save();
}

export async function updateComplaint(
  complaintId: string,
  status: string,
): Promise<IComplaint | null> {
  return await Complaint.findByIdAndUpdate(
    complaintId,
    { status: status },
    { new: true, runValidators: true },
  );
}

export async function addReply(complaintId: string, reply: string): Promise<IComplaint | null> {
  return await Complaint.findByIdAndUpdate(
    complaintId,
    { $push: { replies: reply } },
    { new: true },
  );
}
