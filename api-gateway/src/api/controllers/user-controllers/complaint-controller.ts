import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as complaintService from "@/services/user-services/complaint-service";

export async function getAllComplaints(req: Request, res: Response) {
  try {
    const complaints = await complaintService.getAllComplaints();
    res.status(complaints.status).json(complaints.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getComplaintByOwner(req: Request, res: Response) {
  const ownerId = req.params.ownerId;
  try {
    const complaint = await complaintService.getComplaintByOwner(ownerId);
    res.status(complaint.status).json(complaint.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createComplaint(req: Request, res: Response) {
  const complaintData = req.body;
  try {
    const complaint = await complaintService.createComplaint(complaintData);
    res.status(complaint.status).json(complaint.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function updateComplaint(req: Request, res: Response) {
  const complaintId = req.params.id;
  const complaintData = req.body;
  try {
    const complaint = await complaintService.updateComplaint(complaintId, complaintData);
    res.status(complaint.status).json(complaint.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function addReply(req: Request, res: Response) {
  const complaintId = req.params.id;
  const replyData = req.body;
  try {
    const reply = await complaintService.addReply(complaintId, replyData);
    res.status(reply.status).json(reply.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
